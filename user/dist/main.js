"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const response_interceptor_1 = require("./core/response.interceptor");
const docsEndpoint = '/docs';
const title = process.env.USER_HOST;
function configureSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(title)
        .setDescription('API Description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(docsEndpoint, app, document);
}
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_service_1.ConfigService);
    app.enableCors({ origin: '*' });
    const moduleRef = app.select(app_module_1.AppModule);
    const reflector = moduleRef.get(core_1.Reflector);
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor(reflector));
    configureSwagger(app);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [`${configService.get('rb_url')}`],
            queue: `${configService.get('user_queue')}`,
            queueOptions: { durable: false },
            prefetchCount: 1,
        },
    });
    await app.startAllMicroservices();
    await app.listen(configService.get('servicePort'));
    logger.log(`🚀 User service running on port ${configService.get('servicePort')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map