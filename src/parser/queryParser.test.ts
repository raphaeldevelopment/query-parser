import { describe, expect, expectTypeOf, it } from "vitest"
import { queryParser } from "./queryParser"

describe("queryParser", () => {
  describe("primitive values", () => {
    it("parses integer numbers", () => {
      expect(queryParser("123")).toBe(123)
      expect(queryParser("-42")).toBe(-42)
      expect(queryParser("0")).toBe(0)
    })

    it("parses floating point numbers", () => {
      expect(queryParser("12.5")).toBe(12.5)
      expect(queryParser("-0.75")).toBe(-0.75)
    })

    it("parses booleans", () => {
      expect(queryParser("true")).toBe(true)
      expect(queryParser("false")).toBe(false)
    })

    it("keeps plain strings as strings", () => {
      expect(queryParser("hello")).toBe("hello")
      expect(queryParser("abc123")).toBe("abc123")
      expect(queryParser("12abc")).toBe("12abc")
    })

    it("does not parse empty string as number", () => {
      expect(queryParser("")).toBe("")
    })

    it("does not parse whitespace-only string as number", () => {
      expect(queryParser("   ")).toBe("   ")
    })
  })

  describe("comma-separated values", () => {
    it("parses comma-separated numbers into an array", () => {
      expect(queryParser("1,2,3")).toEqual([1, 2, 3])
    })

    it("parses comma-separated booleans into an array", () => {
      expect(queryParser("true,false,true")).toEqual([true, false, true])
    })

    it("parses mixed comma-separated values", () => {
      expect(queryParser("1,true,hello,2.5,false")).toEqual([
        1,
        true,
        "hello",
        2.5,
        false,
      ])
    })

    it("keeps string values in arrays when they are not numeric or boolean", () => {
      expect(queryParser("foo,bar,baz")).toEqual(["foo", "bar", "baz"])
    })

    it("handles a single-item array-like string as a primitive when no comma exists", () => {
      expect(queryParser("hello")).not.toEqual(["hello"])
      expect(queryParser("hello")).toBe("hello")
    })
  })

  describe("escaped commas", () => {
    it("does not split on escaped comma", () => {
      expect(queryParser("hello\\,world")).toBe("hello,world")
    })

    it("does not split on escaped comma inside a list", () => {
      expect(queryParser("a,b\\,c,d")).toEqual(["a", "b,c", "d"])
    })

    it("handles multiple escaped commas", () => {
      expect(queryParser("a\\,b\\,c")).toBe("a,b,c")
    })

    it("handles escaped commas mixed with typed values", () => {
      expect(queryParser("1,true,hello\\,world,3")).toEqual([
        1,
        true,
        "hello,world",
        3,
      ])
    })
  })

  describe("backslashes before commas", () => {
    it("treats comma after double backslash as not escaped", () => {
      expect(queryParser("a\\\\,b")).toEqual(["a\\", "b"])
    })

    it("treats comma after odd number of backslashes as escaped", () => {
      expect(queryParser("a\\\\\\,b")).toBe("a\\\,b")
    })

    it("treats comma after even number of backslashes as not escaped", () => {
      expect(queryParser("a\\\\\\\\,b")).toEqual(["a\\\\", "b"])
    })
  })

  describe("edge cases", () => {
    it("handles leading comma", () => {
      expect(queryParser(",a")).toEqual(["", "a"])
    })

    it("handles trailing comma", () => {
      expect(queryParser("a,")).toEqual(["a", ""])
    })

    it("handles consecutive commas", () => {
      expect(queryParser("a,,b")).toEqual(["a", "", "b"])
    })

    it("handles only commas", () => {
      expect(queryParser(",,")).toEqual(["", "", ""])
    })

    it("handles escaped comma near empty values", () => {
      expect(queryParser("a,\\,b")).toEqual(["a", ",b"])
    })
  })
})