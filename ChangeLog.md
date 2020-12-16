# ChangeLog

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
