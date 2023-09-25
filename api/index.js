import { app } from "../app.js"
import { PORT } from "../utilities/config.js"
import { info } from "../utilities/logger.js"

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})