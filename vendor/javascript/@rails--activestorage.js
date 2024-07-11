var t = { exports: {} };
(function (t, e) {
  (function (e) {
    t.exports = e();
  })(function (t) {
    var e = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    function md5cycle(t, e) {
      var r = t[0],
        i = t[1],
        s = t[2],
        n = t[3];
      r += (((i & s) | (~i & n)) + e[0] - 680876936) | 0;
      r = (((r << 7) | (r >>> 25)) + i) | 0;
      n += (((r & i) | (~r & s)) + e[1] - 389564586) | 0;
      n = (((n << 12) | (n >>> 20)) + r) | 0;
      s += (((n & r) | (~n & i)) + e[2] + 606105819) | 0;
      s = (((s << 17) | (s >>> 15)) + n) | 0;
      i += (((s & n) | (~s & r)) + e[3] - 1044525330) | 0;
      i = (((i << 22) | (i >>> 10)) + s) | 0;
      r += (((i & s) | (~i & n)) + e[4] - 176418897) | 0;
      r = (((r << 7) | (r >>> 25)) + i) | 0;
      n += (((r & i) | (~r & s)) + e[5] + 1200080426) | 0;
      n = (((n << 12) | (n >>> 20)) + r) | 0;
      s += (((n & r) | (~n & i)) + e[6] - 1473231341) | 0;
      s = (((s << 17) | (s >>> 15)) + n) | 0;
      i += (((s & n) | (~s & r)) + e[7] - 45705983) | 0;
      i = (((i << 22) | (i >>> 10)) + s) | 0;
      r += (((i & s) | (~i & n)) + e[8] + 1770035416) | 0;
      r = (((r << 7) | (r >>> 25)) + i) | 0;
      n += (((r & i) | (~r & s)) + e[9] - 1958414417) | 0;
      n = (((n << 12) | (n >>> 20)) + r) | 0;
      s += (((n & r) | (~n & i)) + e[10] - 42063) | 0;
      s = (((s << 17) | (s >>> 15)) + n) | 0;
      i += (((s & n) | (~s & r)) + e[11] - 1990404162) | 0;
      i = (((i << 22) | (i >>> 10)) + s) | 0;
      r += (((i & s) | (~i & n)) + e[12] + 1804603682) | 0;
      r = (((r << 7) | (r >>> 25)) + i) | 0;
      n += (((r & i) | (~r & s)) + e[13] - 40341101) | 0;
      n = (((n << 12) | (n >>> 20)) + r) | 0;
      s += (((n & r) | (~n & i)) + e[14] - 1502002290) | 0;
      s = (((s << 17) | (s >>> 15)) + n) | 0;
      i += (((s & n) | (~s & r)) + e[15] + 1236535329) | 0;
      i = (((i << 22) | (i >>> 10)) + s) | 0;
      r += (((i & n) | (s & ~n)) + e[1] - 165796510) | 0;
      r = (((r << 5) | (r >>> 27)) + i) | 0;
      n += (((r & s) | (i & ~s)) + e[6] - 1069501632) | 0;
      n = (((n << 9) | (n >>> 23)) + r) | 0;
      s += (((n & i) | (r & ~i)) + e[11] + 643717713) | 0;
      s = (((s << 14) | (s >>> 18)) + n) | 0;
      i += (((s & r) | (n & ~r)) + e[0] - 373897302) | 0;
      i = (((i << 20) | (i >>> 12)) + s) | 0;
      r += (((i & n) | (s & ~n)) + e[5] - 701558691) | 0;
      r = (((r << 5) | (r >>> 27)) + i) | 0;
      n += (((r & s) | (i & ~s)) + e[10] + 38016083) | 0;
      n = (((n << 9) | (n >>> 23)) + r) | 0;
      s += (((n & i) | (r & ~i)) + e[15] - 660478335) | 0;
      s = (((s << 14) | (s >>> 18)) + n) | 0;
      i += (((s & r) | (n & ~r)) + e[4] - 405537848) | 0;
      i = (((i << 20) | (i >>> 12)) + s) | 0;
      r += (((i & n) | (s & ~n)) + e[9] + 568446438) | 0;
      r = (((r << 5) | (r >>> 27)) + i) | 0;
      n += (((r & s) | (i & ~s)) + e[14] - 1019803690) | 0;
      n = (((n << 9) | (n >>> 23)) + r) | 0;
      s += (((n & i) | (r & ~i)) + e[3] - 187363961) | 0;
      s = (((s << 14) | (s >>> 18)) + n) | 0;
      i += (((s & r) | (n & ~r)) + e[8] + 1163531501) | 0;
      i = (((i << 20) | (i >>> 12)) + s) | 0;
      r += (((i & n) | (s & ~n)) + e[13] - 1444681467) | 0;
      r = (((r << 5) | (r >>> 27)) + i) | 0;
      n += (((r & s) | (i & ~s)) + e[2] - 51403784) | 0;
      n = (((n << 9) | (n >>> 23)) + r) | 0;
      s += (((n & i) | (r & ~i)) + e[7] + 1735328473) | 0;
      s = (((s << 14) | (s >>> 18)) + n) | 0;
      i += (((s & r) | (n & ~r)) + e[12] - 1926607734) | 0;
      i = (((i << 20) | (i >>> 12)) + s) | 0;
      r += ((i ^ s ^ n) + e[5] - 378558) | 0;
      r = (((r << 4) | (r >>> 28)) + i) | 0;
      n += ((r ^ i ^ s) + e[8] - 2022574463) | 0;
      n = (((n << 11) | (n >>> 21)) + r) | 0;
      s += ((n ^ r ^ i) + e[11] + 1839030562) | 0;
      s = (((s << 16) | (s >>> 16)) + n) | 0;
      i += ((s ^ n ^ r) + e[14] - 35309556) | 0;
      i = (((i << 23) | (i >>> 9)) + s) | 0;
      r += ((i ^ s ^ n) + e[1] - 1530992060) | 0;
      r = (((r << 4) | (r >>> 28)) + i) | 0;
      n += ((r ^ i ^ s) + e[4] + 1272893353) | 0;
      n = (((n << 11) | (n >>> 21)) + r) | 0;
      s += ((n ^ r ^ i) + e[7] - 155497632) | 0;
      s = (((s << 16) | (s >>> 16)) + n) | 0;
      i += ((s ^ n ^ r) + e[10] - 1094730640) | 0;
      i = (((i << 23) | (i >>> 9)) + s) | 0;
      r += ((i ^ s ^ n) + e[13] + 681279174) | 0;
      r = (((r << 4) | (r >>> 28)) + i) | 0;
      n += ((r ^ i ^ s) + e[0] - 358537222) | 0;
      n = (((n << 11) | (n >>> 21)) + r) | 0;
      s += ((n ^ r ^ i) + e[3] - 722521979) | 0;
      s = (((s << 16) | (s >>> 16)) + n) | 0;
      i += ((s ^ n ^ r) + e[6] + 76029189) | 0;
      i = (((i << 23) | (i >>> 9)) + s) | 0;
      r += ((i ^ s ^ n) + e[9] - 640364487) | 0;
      r = (((r << 4) | (r >>> 28)) + i) | 0;
      n += ((r ^ i ^ s) + e[12] - 421815835) | 0;
      n = (((n << 11) | (n >>> 21)) + r) | 0;
      s += ((n ^ r ^ i) + e[15] + 530742520) | 0;
      s = (((s << 16) | (s >>> 16)) + n) | 0;
      i += ((s ^ n ^ r) + e[2] - 995338651) | 0;
      i = (((i << 23) | (i >>> 9)) + s) | 0;
      r += ((s ^ (i | ~n)) + e[0] - 198630844) | 0;
      r = (((r << 6) | (r >>> 26)) + i) | 0;
      n += ((i ^ (r | ~s)) + e[7] + 1126891415) | 0;
      n = (((n << 10) | (n >>> 22)) + r) | 0;
      s += ((r ^ (n | ~i)) + e[14] - 1416354905) | 0;
      s = (((s << 15) | (s >>> 17)) + n) | 0;
      i += ((n ^ (s | ~r)) + e[5] - 57434055) | 0;
      i = (((i << 21) | (i >>> 11)) + s) | 0;
      r += ((s ^ (i | ~n)) + e[12] + 1700485571) | 0;
      r = (((r << 6) | (r >>> 26)) + i) | 0;
      n += ((i ^ (r | ~s)) + e[3] - 1894986606) | 0;
      n = (((n << 10) | (n >>> 22)) + r) | 0;
      s += ((r ^ (n | ~i)) + e[10] - 1051523) | 0;
      s = (((s << 15) | (s >>> 17)) + n) | 0;
      i += ((n ^ (s | ~r)) + e[1] - 2054922799) | 0;
      i = (((i << 21) | (i >>> 11)) + s) | 0;
      r += ((s ^ (i | ~n)) + e[8] + 1873313359) | 0;
      r = (((r << 6) | (r >>> 26)) + i) | 0;
      n += ((i ^ (r | ~s)) + e[15] - 30611744) | 0;
      n = (((n << 10) | (n >>> 22)) + r) | 0;
      s += ((r ^ (n | ~i)) + e[6] - 1560198380) | 0;
      s = (((s << 15) | (s >>> 17)) + n) | 0;
      i += ((n ^ (s | ~r)) + e[13] + 1309151649) | 0;
      i = (((i << 21) | (i >>> 11)) + s) | 0;
      r += ((s ^ (i | ~n)) + e[4] - 145523070) | 0;
      r = (((r << 6) | (r >>> 26)) + i) | 0;
      n += ((i ^ (r | ~s)) + e[11] - 1120210379) | 0;
      n = (((n << 10) | (n >>> 22)) + r) | 0;
      s += ((r ^ (n | ~i)) + e[2] + 718787259) | 0;
      s = (((s << 15) | (s >>> 17)) + n) | 0;
      i += ((n ^ (s | ~r)) + e[9] - 343485551) | 0;
      i = (((i << 21) | (i >>> 11)) + s) | 0;
      t[0] = (r + t[0]) | 0;
      t[1] = (i + t[1]) | 0;
      t[2] = (s + t[2]) | 0;
      t[3] = (n + t[3]) | 0;
    }
    function md5blk(t) {
      var e,
        r = [];
      for (e = 0; e < 64; e += 4)
        r[e >> 2] =
          t.charCodeAt(e) +
          (t.charCodeAt(e + 1) << 8) +
          (t.charCodeAt(e + 2) << 16) +
          (t.charCodeAt(e + 3) << 24);
      return r;
    }
    function md5blk_array(t) {
      var e,
        r = [];
      for (e = 0; e < 64; e += 4)
        r[e >> 2] =
          t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
      return r;
    }
    function md51(t) {
      var e,
        r,
        i,
        s,
        n,
        a,
        o = t.length,
        h = [1732584193, -271733879, -1732584194, 271733878];
      for (e = 64; e <= o; e += 64) md5cycle(h, md5blk(t.substring(e - 64, e)));
      t = t.substring(e - 64);
      r = t.length;
      i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (e = 0; e < r; e += 1) i[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
      i[e >> 2] |= 128 << (e % 4 << 3);
      if (e > 55) {
        md5cycle(h, i);
        for (e = 0; e < 16; e += 1) i[e] = 0;
      }
      s = o * 8;
      s = s.toString(16).match(/(.*?)(.{0,8})$/);
      n = parseInt(s[2], 16);
      a = parseInt(s[1], 16) || 0;
      i[14] = n;
      i[15] = a;
      md5cycle(h, i);
      return h;
    }
    function md51_array(t) {
      var e,
        r,
        i,
        s,
        n,
        a,
        o = t.length,
        h = [1732584193, -271733879, -1732584194, 271733878];
      for (e = 64; e <= o; e += 64)
        md5cycle(h, md5blk_array(t.subarray(e - 64, e)));
      t = e - 64 < o ? t.subarray(e - 64) : new Uint8Array(0);
      r = t.length;
      i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (e = 0; e < r; e += 1) i[e >> 2] |= t[e] << (e % 4 << 3);
      i[e >> 2] |= 128 << (e % 4 << 3);
      if (e > 55) {
        md5cycle(h, i);
        for (e = 0; e < 16; e += 1) i[e] = 0;
      }
      s = o * 8;
      s = s.toString(16).match(/(.*?)(.{0,8})$/);
      n = parseInt(s[2], 16);
      a = parseInt(s[1], 16) || 0;
      i[14] = n;
      i[15] = a;
      md5cycle(h, i);
      return h;
    }
    function rhex(t) {
      var r,
        i = "";
      for (r = 0; r < 4; r += 1)
        i += e[(t >> (r * 8 + 4)) & 15] + e[(t >> (r * 8)) & 15];
      return i;
    }
    function hex(t) {
      var e;
      for (e = 0; e < t.length; e += 1) t[e] = rhex(t[e]);
      return t.join("");
    }
    hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592";
    typeof ArrayBuffer === "undefined" ||
      ArrayBuffer.prototype.slice ||
      (function () {
        function clamp(t, e) {
          t = t | 0 || 0;
          return t < 0 ? Math.max(t + e, 0) : Math.min(t, e);
        }
        ArrayBuffer.prototype.slice = function (e, r) {
          var i,
            s,
            n,
            a,
            o = this.byteLength,
            h = clamp(e, o),
            u = o;
          r !== t && (u = clamp(r, o));
          if (h > u) return new ArrayBuffer(0);
          i = u - h;
          s = new ArrayBuffer(i);
          n = new Uint8Array(s);
          a = new Uint8Array(this, h, i);
          n.set(a);
          return s;
        };
      })();
    function toUtf8(t) {
      /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t)));
      return t;
    }
    function utf8Str2ArrayBuffer(t, e) {
      var r,
        i = t.length,
        s = new ArrayBuffer(i),
        n = new Uint8Array(s);
      for (r = 0; r < i; r += 1) n[r] = t.charCodeAt(r);
      return e ? n : s;
    }
    function arrayBuffer2Utf8Str(t) {
      return String.fromCharCode.apply(null, new Uint8Array(t));
    }
    function concatenateArrayBuffers(t, e, r) {
      var i = new Uint8Array(t.byteLength + e.byteLength);
      i.set(new Uint8Array(t));
      i.set(new Uint8Array(e), t.byteLength);
      return r ? i : i.buffer;
    }
    function hexToBinaryString(t) {
      var e,
        r = [],
        i = t.length;
      for (e = 0; e < i - 1; e += 2) r.push(parseInt(t.substr(e, 2), 16));
      return String.fromCharCode.apply(String, r);
    }
    function SparkMD5() {
      this.reset();
    }
    SparkMD5.prototype.append = function (t) {
      this.appendBinary(toUtf8(t));
      return this;
    };
    SparkMD5.prototype.appendBinary = function (t) {
      this._buff += t;
      this._length += t.length;
      var e,
        r = this._buff.length;
      for (e = 64; e <= r; e += 64)
        md5cycle(this._hash, md5blk(this._buff.substring(e - 64, e)));
      this._buff = this._buff.substring(e - 64);
      return this;
    };
    SparkMD5.prototype.end = function (t) {
      var e,
        r,
        i = this._buff,
        s = i.length,
        n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (e = 0; e < s; e += 1) n[e >> 2] |= i.charCodeAt(e) << (e % 4 << 3);
      this._finish(n, s);
      r = hex(this._hash);
      t && (r = hexToBinaryString(r));
      this.reset();
      return r;
    };
    SparkMD5.prototype.reset = function () {
      this._buff = "";
      this._length = 0;
      this._hash = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD5.prototype.getState = function () {
      return {
        buff: this._buff,
        length: this._length,
        hash: this._hash.slice(),
      };
    };
    SparkMD5.prototype.setState = function (t) {
      this._buff = t.buff;
      this._length = t.length;
      this._hash = t.hash;
      return this;
    };
    SparkMD5.prototype.destroy = function () {
      delete this._hash;
      delete this._buff;
      delete this._length;
    };
    SparkMD5.prototype._finish = function (t, e) {
      var r,
        i,
        s,
        n = e;
      t[n >> 2] |= 128 << (n % 4 << 3);
      if (n > 55) {
        md5cycle(this._hash, t);
        for (n = 0; n < 16; n += 1) t[n] = 0;
      }
      r = this._length * 8;
      r = r.toString(16).match(/(.*?)(.{0,8})$/);
      i = parseInt(r[2], 16);
      s = parseInt(r[1], 16) || 0;
      t[14] = i;
      t[15] = s;
      md5cycle(this._hash, t);
    };
    SparkMD5.hash = function (t, e) {
      return SparkMD5.hashBinary(toUtf8(t), e);
    };
    SparkMD5.hashBinary = function (t, e) {
      var r = md51(t),
        i = hex(r);
      return e ? hexToBinaryString(i) : i;
    };
    SparkMD5.ArrayBuffer = function () {
      this.reset();
    };
    SparkMD5.ArrayBuffer.prototype.append = function (t) {
      var e,
        r = concatenateArrayBuffers(this._buff.buffer, t, true),
        i = r.length;
      this._length += t.byteLength;
      for (e = 64; e <= i; e += 64)
        md5cycle(this._hash, md5blk_array(r.subarray(e - 64, e)));
      this._buff =
        e - 64 < i ? new Uint8Array(r.buffer.slice(e - 64)) : new Uint8Array(0);
      return this;
    };
    SparkMD5.ArrayBuffer.prototype.end = function (t) {
      var e,
        r,
        i = this._buff,
        s = i.length,
        n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (e = 0; e < s; e += 1) n[e >> 2] |= i[e] << (e % 4 << 3);
      this._finish(n, s);
      r = hex(this._hash);
      t && (r = hexToBinaryString(r));
      this.reset();
      return r;
    };
    SparkMD5.ArrayBuffer.prototype.reset = function () {
      this._buff = new Uint8Array(0);
      this._length = 0;
      this._hash = [1732584193, -271733879, -1732584194, 271733878];
      return this;
    };
    SparkMD5.ArrayBuffer.prototype.getState = function () {
      var t = SparkMD5.prototype.getState.call(this);
      t.buff = arrayBuffer2Utf8Str(t.buff);
      return t;
    };
    SparkMD5.ArrayBuffer.prototype.setState = function (t) {
      t.buff = utf8Str2ArrayBuffer(t.buff, true);
      return SparkMD5.prototype.setState.call(this, t);
    };
    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
    SparkMD5.ArrayBuffer.hash = function (t, e) {
      var r = md51_array(new Uint8Array(t)),
        i = hex(r);
      return e ? hexToBinaryString(i) : i;
    };
    return SparkMD5;
  });
})(t);
var e = t.exports;
const r =
  File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
class FileChecksum {
  static create(t, e) {
    const r = new FileChecksum(t);
    r.create(e);
  }
  constructor(t) {
    this.file = t;
    this.chunkSize = 2097152;
    this.chunkCount = Math.ceil(this.file.size / this.chunkSize);
    this.chunkIndex = 0;
  }
  create(t) {
    this.callback = t;
    this.md5Buffer = new e.ArrayBuffer();
    this.fileReader = new FileReader();
    this.fileReader.addEventListener("load", (t) => this.fileReaderDidLoad(t));
    this.fileReader.addEventListener("error", (t) =>
      this.fileReaderDidError(t),
    );
    this.readNextChunk();
  }
  fileReaderDidLoad(t) {
    this.md5Buffer.append(t.target.result);
    if (!this.readNextChunk()) {
      const t = this.md5Buffer.end(true);
      const e = btoa(t);
      this.callback(null, e);
    }
  }
  fileReaderDidError(t) {
    this.callback(`Error reading ${this.file.name}`);
  }
  readNextChunk() {
    if (
      this.chunkIndex < this.chunkCount ||
      (this.chunkIndex == 0 && this.chunkCount == 0)
    ) {
      const t = this.chunkIndex * this.chunkSize;
      const e = Math.min(t + this.chunkSize, this.file.size);
      const i = r.call(this.file, t, e);
      this.fileReader.readAsArrayBuffer(i);
      this.chunkIndex++;
      return true;
    }
    return false;
  }
}
function getMetaValue(t) {
  const e = findElement(document.head, `meta[name="${t}"]`);
  if (e) return e.getAttribute("content");
}
function findElements(t, e) {
  if (typeof t == "string") {
    e = t;
    t = document;
  }
  const r = t.querySelectorAll(e);
  return toArray(r);
}
function findElement(t, e) {
  if (typeof t == "string") {
    e = t;
    t = document;
  }
  return t.querySelector(e);
}
function dispatchEvent(t, e, r = {}) {
  const { disabled: i } = t;
  const { bubbles: s, cancelable: n, detail: a } = r;
  const o = document.createEvent("Event");
  o.initEvent(e, s || true, n || true);
  o.detail = a || {};
  try {
    t.disabled = false;
    t.dispatchEvent(o);
  } finally {
    t.disabled = i;
  }
  return o;
}
function toArray(t) {
  return Array.isArray(t) ? t : Array.from ? Array.from(t) : [].slice.call(t);
}
class BlobRecord {
  constructor(t, e, r, i = {}) {
    this.file = t;
    this.attributes = {
      filename: t.name,
      content_type: t.type || "application/octet-stream",
      byte_size: t.size,
      checksum: e,
    };
    this.xhr = new XMLHttpRequest();
    this.xhr.open("POST", r, true);
    this.xhr.responseType = "json";
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.setRequestHeader("Accept", "application/json");
    this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    Object.keys(i).forEach((t) => {
      this.xhr.setRequestHeader(t, i[t]);
    });
    const s = getMetaValue("csrf-token");
    s != void 0 && this.xhr.setRequestHeader("X-CSRF-Token", s);
    this.xhr.addEventListener("load", (t) => this.requestDidLoad(t));
    this.xhr.addEventListener("error", (t) => this.requestDidError(t));
  }
  get status() {
    return this.xhr.status;
  }
  get response() {
    const { responseType: t, response: e } = this.xhr;
    return t == "json" ? e : JSON.parse(e);
  }
  create(t) {
    this.callback = t;
    this.xhr.send(JSON.stringify({ blob: this.attributes }));
  }
  requestDidLoad(t) {
    if (this.status >= 200 && this.status < 300) {
      const { response: t } = this;
      const { direct_upload: e } = t;
      delete t.direct_upload;
      this.attributes = t;
      this.directUploadData = e;
      this.callback(null, this.toJSON());
    } else this.requestDidError(t);
  }
  requestDidError(t) {
    this.callback(
      `Error creating Blob for "${this.file.name}". Status: ${this.status}`,
    );
  }
  toJSON() {
    const t = {};
    for (const e in this.attributes) t[e] = this.attributes[e];
    return t;
  }
}
class BlobUpload {
  constructor(t) {
    this.blob = t;
    this.file = t.file;
    const { url: e, headers: r } = t.directUploadData;
    this.xhr = new XMLHttpRequest();
    this.xhr.open("PUT", e, true);
    this.xhr.responseType = "text";
    for (const t in r) this.xhr.setRequestHeader(t, r[t]);
    this.xhr.addEventListener("load", (t) => this.requestDidLoad(t));
    this.xhr.addEventListener("error", (t) => this.requestDidError(t));
  }
  create(t) {
    this.callback = t;
    this.xhr.send(this.file.slice());
  }
  requestDidLoad(t) {
    const { status: e, response: r } = this.xhr;
    e >= 200 && e < 300 ? this.callback(null, r) : this.requestDidError(t);
  }
  requestDidError(t) {
    this.callback(
      `Error storing "${this.file.name}". Status: ${this.xhr.status}`,
    );
  }
}
let i = 0;
class DirectUpload {
  constructor(t, e, r, s = {}) {
    this.id = ++i;
    this.file = t;
    this.url = e;
    this.delegate = r;
    this.customHeaders = s;
  }
  create(t) {
    FileChecksum.create(this.file, (e, r) => {
      if (e) {
        t(e);
        return;
      }
      const i = new BlobRecord(this.file, r, this.url, this.customHeaders);
      notify(this.delegate, "directUploadWillCreateBlobWithXHR", i.xhr);
      i.create((e) => {
        if (e) t(e);
        else {
          const e = new BlobUpload(i);
          notify(this.delegate, "directUploadWillStoreFileWithXHR", e.xhr);
          e.create((e) => {
            e ? t(e) : t(null, i.toJSON());
          });
        }
      });
    });
  }
}
function notify(t, e, ...r) {
  if (t && typeof t[e] == "function") return t[e](...r);
}
class DirectUploadController {
  constructor(t, e) {
    this.input = t;
    this.file = e;
    this.directUpload = new DirectUpload(this.file, this.url, this);
    this.dispatch("initialize");
  }
  start(t) {
    const e = document.createElement("input");
    e.type = "hidden";
    e.name = this.input.name;
    this.input.insertAdjacentElement("beforebegin", e);
    this.dispatch("start");
    this.directUpload.create((r, i) => {
      if (r) {
        e.parentNode.removeChild(e);
        this.dispatchError(r);
      } else e.value = i.signed_id;
      this.dispatch("end");
      t(r);
    });
  }
  uploadRequestDidProgress(t) {
    const e = (t.loaded / t.total) * 100;
    e && this.dispatch("progress", { progress: e });
  }
  get url() {
    return this.input.getAttribute("data-direct-upload-url");
  }
  dispatch(t, e = {}) {
    e.file = this.file;
    e.id = this.directUpload.id;
    return dispatchEvent(this.input, `direct-upload:${t}`, { detail: e });
  }
  dispatchError(t) {
    const e = this.dispatch("error", { error: t });
    e.defaultPrevented || alert(t);
  }
  directUploadWillCreateBlobWithXHR(t) {
    this.dispatch("before-blob-request", { xhr: t });
  }
  directUploadWillStoreFileWithXHR(t) {
    this.dispatch("before-storage-request", { xhr: t });
    t.upload.addEventListener("progress", (t) =>
      this.uploadRequestDidProgress(t),
    );
  }
}
const s = "input[type=file][data-direct-upload-url]:not([disabled])";
class DirectUploadsController {
  constructor(t) {
    this.form = t;
    this.inputs = findElements(t, s).filter((t) => t.files.length);
  }
  start(t) {
    const e = this.createDirectUploadControllers();
    const startNextController = () => {
      const r = e.shift();
      if (r)
        r.start((e) => {
          if (e) {
            t(e);
            this.dispatch("end");
          } else startNextController();
        });
      else {
        t();
        this.dispatch("end");
      }
    };
    this.dispatch("start");
    startNextController();
  }
  createDirectUploadControllers() {
    const t = [];
    this.inputs.forEach((e) => {
      toArray(e.files).forEach((r) => {
        const i = new DirectUploadController(e, r);
        t.push(i);
      });
    });
    return t;
  }
  dispatch(t, e = {}) {
    return dispatchEvent(this.form, `direct-uploads:${t}`, { detail: e });
  }
}
const n = "data-direct-uploads-processing";
const a = new WeakMap();
let o = false;
function start() {
  if (!o) {
    o = true;
    document.addEventListener("click", didClick, true);
    document.addEventListener("submit", didSubmitForm, true);
    document.addEventListener("ajax:before", didSubmitRemoteElement);
  }
}
function didClick(t) {
  const e = t.target.closest("button, input");
  e && e.type === "submit" && e.form && a.set(e.form, e);
}
function didSubmitForm(t) {
  handleFormSubmissionEvent(t);
}
function didSubmitRemoteElement(t) {
  t.target.tagName == "FORM" && handleFormSubmissionEvent(t);
}
function handleFormSubmissionEvent(t) {
  const e = t.target;
  if (e.hasAttribute(n)) {
    t.preventDefault();
    return;
  }
  const r = new DirectUploadsController(e);
  const { inputs: i } = r;
  if (i.length) {
    t.preventDefault();
    e.setAttribute(n, "");
    i.forEach(disable);
    r.start((t) => {
      e.removeAttribute(n);
      t ? i.forEach(enable) : submitForm(e);
    });
  }
}
function submitForm(t) {
  let e = a.get(t) || findElement(t, "input[type=submit], button[type=submit]");
  if (e) {
    const { disabled: t } = e;
    e.disabled = false;
    e.focus();
    e.click();
    e.disabled = t;
  } else {
    e = document.createElement("input");
    e.type = "submit";
    e.style.display = "none";
    t.appendChild(e);
    e.click();
    t.removeChild(e);
  }
  a.delete(t);
}
function disable(t) {
  t.disabled = true;
}
function enable(t) {
  t.disabled = false;
}
function autostart() {
  window.ActiveStorage && start();
}
setTimeout(autostart, 1);
export { DirectUpload, DirectUploadController, DirectUploadsController, start };
