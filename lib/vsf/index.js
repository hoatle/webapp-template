/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The common vsf module
 */

function appDir() {
  return process.cwd();
}

/**
 * To avoid using relative path, use this.
 *
 * module must start with a '/'.
 *
 * @param module
 * @return {*}
 */
function requireRelative(module) {
  return require(appDir() + module);
}

/**
 * Gets the application directory
 *
 * @type {Function}
 */
exports.appDir = appDir;

/**
 * Requires any module that is appended as: appDir() + module.
 * This is usually intended for shallow require, typical on unit tests.
 *
 * @type {Function}
 */
exports.require = requireRelative;