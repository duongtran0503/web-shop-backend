class ResultType {
    error({
        status = 'failed',
        message = 'Internal Server Error',
        success = false,
        code = 500,
    } = {}) {
        return {
            status: status,
            message: message,
            success: success,
            code: code,
        };
    }
    success({
        status = 'success',
        message = 'Operation successful',
        success = true,
        code = 200,
        data = null,
    } = {}) {
        return {
            status: status,
            message: message,
            success: success,
            code: code,
            data: data,
        };
    }
}
module.exports = new ResultType();
