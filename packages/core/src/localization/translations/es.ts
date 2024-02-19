export default {
  Alpha: "La cadena dada solo debe contener caracteres alfabéticos",
  Alphanumeric: "La cadena dada solo debe contener caracteres alfabéticos o numéricos",
  ArrayContains: "La matriz debe contener el siguiente elemento: {0}",
  ArrayEmpty: "La matriz debe estar vacía.",
  ArraySizeExact: "La matriz debe contener exactamente {0} elementos pero contiene {1}.",
  ArraySizeMax: "La matriz debe contener como máximo {0} elementos pero contiene {1}.",
  ArraySizeMin: "La matriz debe contener como mínimo {0} elementos pero contiene {1}.",
  ArraySizeRange: "La matriz debe contener entre {0} y {1} elementos pero contiene {2}.",
  ArrayUnique: "Los elementos de la matriz deben ser únicos.",
  Date: "La cadena dada no cumple con el formato de fecha deseado ({0})",
  Decimal: "El valor debe ser un número decimal pero es {0}",
  Digits:
    "La parte entera del número puede tener un máximo de {0} dígitos y la parte fraccionaria un máximo de {1}",
  Email: "El valor no es un correo electrónico válido.",
  ExactLength: "El valor debe contener exactamente {0} caracteres",
  AssertFalse: "El valor debe ser falso.",
  FutureDate: "La fecha {0} debe ser una fecha futura",
  IPAddress: "La cadena dada no es una dirección IP válida",
  Integer: "El valor debe ser un número entero pero es {0}",
  InvalidDigits: "maxInteger [{0}] y maxFraction [{1}] deben ser números enteros",
  JSON: "La cadena dada no es un JSON válido",
  Lowercase: "La cadena dada debe contener solo caracteres en minúscula",
  MaxLength: "El campo no puede contener más de {0} caracteres",
  MinLength: "El campo debe contener al menos {0} caracteres",
  Negative: "El valor debe ser un número negativo pero es {0}",
  NonNegative: "El valor debe ser mayor o igual a 0 pero es {0}",
  NonPositive: "El valor debe ser menor o igual a 0 pero es {0}",
  Numeric: "La cadena dada solo debe contener números",
  PasswordLength: "La contraseña debe tener al menos {0} caracteres",
  PasswordLowercase: "La contraseña debe contener al menos 1 letra minúscula",
  PasswordNumbers: "La contraseña debe contener al menos 1 número",
  PasswordSpecials: "La contraseña debe contener al menos 1 carácter especial",
  PasswordUppercase: "La contraseña debe contener al menos 1 letra mayúscula",
  PastDate: "La fecha {0} debe ser una fecha pasada",
  Positive: "El valor debe ser un número positivo pero es {0}",
  Required: "El campo es obligatorio",
  Time: "La cadena dada no cumple con la configuración regional {0} durante {1} tiempo",
  TodayDate: "La fecha {0} debe ser la fecha de hoy (actual)",
  AssertTrue: "El valor debe ser veraz.",
  URL: "La URL que ingresaste no es válida",
  Uppercase: "La cadena dada debe contener solo caracteres en mayúsculas",
  ValueMax: "El valor máximo permitido es {0} pero es {1}",
  ValueMin: "El valor mínimo permitido es {0} pero es {1}",
  ValueRange: "El valor debe ser mayor o igual a {0} y menor o igual a {1} pero es {2}",
  XML: "La cadena dada no es un XML válido",
  Pattern: "El valor no satisface la siguiente expresión regular: {0}",
  ArrayEvery: "No todos los insumos satisfacen un criterio determinado",
  ArrayNone: "Todas las entradas no deben satisfacer un criterio determinado.",
  ArrayOne: "Este conjunto de datos requiere exactamente un valor (0 y 2+ no están permitidos)",
  ArraySome: "Al menos una entrada debe satisfacer un criterio determinado.",
} as const;
