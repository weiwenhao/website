Prism.languages["nature"] = {
  comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,  
  string: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, 
  number: /\b\d+\.?\d*\b/,
  keyword: /\b(fn|int|uint|float|string|bool|u8|u16|u32|u64|i8|i16|i32|i64|f32|f64|T|ptr|type|null|any|struct|throw|try|catch|self|for|in|if|else|var|import|as|is|return|import|continue|break)\b/,
  boolean: /\b(true|false)\b/,
  function: /\b\w+(?=\()/,
  operator: /[-+*\/%=]=?|!=|==|<=?|>=?|&&|\|\|?|\^|\.{2,3}/,
  punctuation: /[(){}\[\]:;,.]/,
};
