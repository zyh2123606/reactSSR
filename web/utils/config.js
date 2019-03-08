/**
 * 配置和工具
 */
import Crypto from 'crypto'
class Config{
    static secretKey = 'linry1379'
    static encryptData = (json={}) => {
        const _data = JSON.stringify(json),
            cipher = Crypto.createCipher("aes128", Config.secretKey)
        let encrypted = cipher.update(_data,"utf8","hex")
        return encrypted += cipher.final("hex")
    }
    static decryptData = (_encrypted) => {
        const decipher = Crypto.createDecipher("aes128", Config.secretKey)
        let decrypted = decipher.update(_encrypted, "hex", "utf8")
        decrypted += decipher.final("utf8")
        return JSON.parse(decrypted)
    }
}

export default Config