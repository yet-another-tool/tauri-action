import { __awaiter, __generator } from 'tslib';
import { resolve, join } from 'path';
import { existsSync } from 'fs';
import { buildProject } from '@tauri-apps/action-core';
import parseArgs from 'minimist';

function run() {
    return __awaiter(this, void 0, void 0, function () {
        var argv, projectPath, configPath, distPath, iconPath, includeDebug, tauriScript, args, options, artifacts, debugArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    argv = parseArgs(process.argv.slice(2), {
                        string: ['project-path', 'config-path', 'dist-path', 'icon-path', 'tauri-script'],
                        boolean: ['global-tauri', 'include-debug'],
                        "default": {
                            'config-path': 'tauri.conf.json',
                            'project-path': ''
                        }
                    });
                    projectPath = resolve(process.cwd(), argv['project-path']);
                    configPath = join(projectPath, argv['config-path']);
                    distPath = argv['dist-path'];
                    iconPath = argv['icon-path'];
                    includeDebug = argv['include-debug'];
                    tauriScript = argv['tauri-script'];
                    args = argv._;
                    options = {
                        configPath: existsSync(configPath) ? configPath : null,
                        distPath: distPath,
                        iconPath: iconPath,
                        tauriScript: tauriScript,
                        args: args
                    };
                    return [4 /*yield*/, buildProject(projectPath, false, options)];
                case 1:
                    artifacts = _a.sent();
                    if (!includeDebug) return [3 /*break*/, 3];
                    return [4 /*yield*/, buildProject(projectPath, true, options)];
                case 2:
                    debugArtifacts = _a.sent();
                    artifacts.push.apply(artifacts, debugArtifacts);
                    _a.label = 3;
                case 3:
                    if (artifacts.length === 0) {
                        throw new Error('No artifacts were found.');
                    }
                    console.log("Artifacts: ".concat(artifacts, "."));
                    return [2 /*return*/];
            }
        });
    });
}

export { run };
