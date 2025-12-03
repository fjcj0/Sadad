export const createAccount = async (request, response) => {
    try {
        const { phone, password, confirm_password } = request.body;
        if (!phone || !password || !confirm_password) {
            return response.status(400).json({
                success: false,
                error: `Error all fileds are required`
            });
        }
    } catch (error) {
        return response.statu(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const login = async (request, response) => {
    try {
        const { phone, password } = request.body;
        if (!phone || !password) {
            return response.status(400).json({
                success: false,
                error: `Error all fields are required`
            });
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const sendVerficationCode = async (request, response) => {
    try {
        const { phone } = request.body;
        if (!phone) {
            return response.status(400).json({
                success: false,
                error: `Phone number is required`
            });
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const verifyCode = async (request, response) => {
    try {
        const { code } = request.body;
        if (!code || code.length != 5) {
            return response.status(400).json({
                error: `Error code length should be 5 digits`
            });
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}