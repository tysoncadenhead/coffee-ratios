module.exports = function (wallaby) {
    
        const path = require('path');
    
        process.env.NODE_PATH +=
            path.delimiter +
            path.join(__dirname, 'node_modules');
    
        return {
            hints: {
                ignoreCoverage: /istanbul ignore next/
            },
        
            files: [
                'src/**/*.ts', 
                'src/**/*.tsx',
                'src/**/*.js',
                '!src/**/__tests__/*.ts',
                '!src/**/__tests__/*.tsx'
            ],
    
            tests: [
                'src/**/__tests__/*.spec.ts',
                'src/**/__tests__/*.spec.tsx',
                'util/**/__tests/*.spec.js'
            ],
    
            env: {
                type: 'node',
                runner: 'node'
            },
    
            testFramework: 'jest',
    
            setup: () => {
                global.__DEV__ = true;
                global.__TEST__ = true;

                global.window = global;
                window.addEventListener = () => {};
                window.requestAnimationFrame = () => {
                  throw new Error('requestAnimationFrame is not supported in Node');
                };
    
                wallaby.testFramework.configure({
                    moduleNameMapper: {
                       '^react-native$': 'react-native-web'
                    }
                });
            },
    
            compilers: {
                '**/*.ts': wallaby.compilers.typeScript(require('./tsconfig.json')),
                '**/*.tsx': wallaby.compilers.typeScript(require('./tsconfig.json')),
                '**/*.js': wallaby.compilers.babel({
                    babel: require('babel-core'),
                    "presets": ["babel-preset-expo"],
                    "env": {
                        "development": {
                        "plugins": ["transform-react-jsx-source"]
                        }
                    }
                })
            }
        };
    };