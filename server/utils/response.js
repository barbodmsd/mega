class Res {
  constructor(res, statusCode, data) {
    this.res = res;
    this.statusCode = statusCode;
    this.data = data;
    this.send();
  }

  send() {
    return this.res.status(this.statusCode).json({
      success: `${this.statusCode}`.startsWith(2) ? true : false,
      ...this.data,
    });
  }
}

export default Res;
