"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
async function bootstrap() {
    const configService = new config_service_1.ConfigService();
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [`${configService.get('rb_url')}`],
            queue: `${configService.get('mailer_queue')}`,
            queueOptions: { durable: false },
            prefetchCount: 1,
        },
    });
    await app.listen();
    logger.log('🚀 Mailer service started');
}
bootstrap();
//# sourceMappingURL=main.js.map