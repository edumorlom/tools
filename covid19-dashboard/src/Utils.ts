/**
 Copyright 2020 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * Converts a number to a string including commas for readability.
 * For example, int(10000) would get converted to str(10,000)
 * @param num: the number to replace
 */
const numberWithCommas = (num: number): string => {
  if (!num) return '0';

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Gets the latest date in the for a a list of Iso-dates.
 * @param: dates: a list of dates in ISO format. Example: "2020-01-02".
 */
const getLatestDate = (dates: string[]): string => {
  if (!dates.length) return '';

  return dates.reduce((a, b) => {
    return new Date(a) > new Date(b) ? a : b;
  });
};

/**
 * Returns the exact color for a given CSS variable.
 * @param color: the variable name of the color.
 */
const Colors = (color: string): string => {
  const css = getComputedStyle(document.body);
  return css.getPropertyValue(color) || color;
};

export {numberWithCommas, getLatestDate, Colors};
