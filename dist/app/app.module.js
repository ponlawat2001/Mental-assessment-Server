"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const preauth_middleware_1 = require("../middleware/preauth.middleware");
const firebase_controller_1 = require("../controller/firebase.controller");
const auth_module_1 = require("../modules/auth.module");
const news_module_1 = require("../modules/news.module");
const vent_module_1 = require("../modules/vent.module");
const users_module_1 = require("../modules/users.module");
const console_1 = require("console");
const avatar_modult_1 = require("../modules/avatar.modult");
const vent_choice_module_1 = require("../modules/vent_choice.module");
const contact_module_1 = require("../modules/contact.module");
const storage_module_1 = require("../modules/storage.module");
const audio_module_1 = require("../modules/audio.module");
const images_module_1 = require("../modules/images.module");
const assessment_module_1 = require("../modules/assessment.module");
const historymodules_1 = require("../modules/historymodules");
const task_module_1 = require("../modules/task.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        let route = [
            { path: 'news/*' },
            { path: 'users/findAll' },
            { path: 'users/findCount' },
            { path: 'users/findOne' },
            { path: 'users/findOneAvatar/*' },
            { path: 'users/update/*' },
            { path: 'users/delete/*' },
            { path: 'avatars/*' },
            { path: 'vent/*' },
            { path: 'contact/*' },
            { path: 'audio/*' },
            { path: 'image/*' },
            { path: 'storage/*' },
            { path: 'assessment/*' },
            { path: 'history/*' },
            { path: 'task/* ' },
        ];
        route.map((element) => {
            (0, console_1.log)(element.path);
            consumer.apply(preauth_middleware_1.default).forRoutes({
                path: element.path,
                method: common_1.RequestMethod.ALL,
            });
        });
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'dist'),
            }),
            task_module_1.TaskModule,
            historymodules_1.HistoryModule,
            assessment_module_1.AssessmentModule,
            auth_module_1.AuthModule,
            news_module_1.NewsModule,
            vent_module_1.VentModule,
            vent_choice_module_1.VentChoiceModule,
            users_module_1.UsersModule,
            avatar_modult_1.AvatarModule,
            contact_module_1.ContactModule,
            audio_module_1.AudioModule,
            images_module_1.ImagesModule,
            storage_module_1.StorageModule,
        ],
        controllers: [app_controller_1.AppController, firebase_controller_1.default],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map