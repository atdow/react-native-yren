/*
 * @Author: atdow
 * @Date: 2022-01-01 00:00:09
 * @LastEditors: null
 * @LastEditTime: 2022-01-01 00:27:18
 * @Description: file description
 */
module.exports = {
    dependencies: {
        "jmessage-react-plugin": {
            platforms: {
                android: {
                    // packageInstance: "new JMessageReactPackage(false)"
                    packageInstance: "new JMessageReactPackage()"
                }
            }
        }
    }
}