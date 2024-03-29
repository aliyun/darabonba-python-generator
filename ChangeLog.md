# ChangeLog

## 1.2.18 - 2024-02-29
* Fix: avoid keywords in variables.

## 1.2.17 - 2023-12-27
* Fix: correct model name when first letter is capitalized && and some keywords

## 1.2.16 - 2023-09-13
* Feat: support importing additional package

## 1.2.15 - 2022-12-26
* Fix: array assign and access with variables name

## 1.2.14 - 2022-12-12

* Fix: avoid keywords in model and variables.

## 1.2.13 - 2022-07-27

* Support import local package.

## 1.2.12 - 2022-07-20

* Support infinite loop reference in model.

## 1.2.11 - 2022-07-11

* Support complex list(`array-in-array`).

## 1.2.10 - 2022-05-31

* Fix import package for typedef.

## 1.2.9 - 2022-05-31

* Support Typedef.

## 1.2.8 - 2020-03-17

* Improve TeaModel to avoid serialization exception.

## 1.2.7 - 2020-03-02

* Python2 version upgraded to compatible version.

## 1.2.6 - 2020-02-05

* Improve annotations.

## 1.2.5 - 2020-01-27

* Resolve multi condition

## 1.2.4 - 2020-01-19

* Fix wrong function return value.
* Fix the error code generated by map operation when property_access is the key.

## 1.2.3 - 2020-12-30

* Support for static type hints to the class itself.

## 1.2.2 - 2020-12-28

* Fix the emit order for sub model code.

## 1.2.1 - 2020-12-25

* Support generate python2 code.
* Fix `variable is not defind` error.

## 1.2.0 - 2020-12-16

* Added support for python3.9.
* Drop support for python3.4 & python3.5 (Currently supported python versions:3.6,3.7,3.8,3.9).
* Support for async function.
* Replace the string formatting syntax with f-string.
* Support for type annotation.

## 1.1.1 - 2020-11-23

* Support for defining multi-line string.
* Support executable option.
* Fix aliases that don`t conform to python syntax.
* Fix the bug that `None` call the `to_map()`.
* Fix can't get variable value from dict & list.
* Fix to_map&from_map using uninitialized parameters.

## 1.1.0 - 2020-10-13

* Fix long description content type error in setup.py.
* support validate maximum and minimum values.
* Fix the exception when tmplate string has no placeholder.
* Improve the default value of clientName&package.
  * Added warning about irregular configuration.
  * Verify naming conventions.
* Added syntax check.
  * End with operator when line feed.

## 1.0.9 - 2020-09-09

* Support type hints.
* Support local installation of python package.

## 1.0.8 - 2020-09-02

* Improve annotation.
  * Specify model type.
  * Add `returnType`.
* Improve model:
  * Support all complex types.
  * Fix non-model object call validate.
* Add `async`, `await` keywords.
* Fix the error when expected to be an array type.
* Fix model.py not import third-party packages.
* Fix import unused modules.
* Support specify the latest version of dependency.

## 1.0.7 - 2020-08-11

* Fix the syntax of calling static methods.

## 1.0.6 - 2020-08-10

* Support array access.

## 1.0.5 - 2020-07-30

* Support description.
* Support [[ string ]] array.
* Imporve model format.

## 1.0.4 - 2020-07-10

* Imporve models
* Imporve function comments

## 1.0.3 - 2020-07-03

* Fixed unsupported symbols

## 1.0.2 - 2020-06-23

* Fixed validate_pattern syntax error

## 1.0.1 - 2020-06-22

* Improve python generator to be compatible with darafile

## 1.0.0 - 2020-06-18

* First release

> Initialization release of the `Darabonba Code Generator for Python` Version 1.0.0 on NPM.
> See <https://www.npmjs.com/package/@darabonba/python-generator> for more information.
