import { LanguageSupport, StreamLanguage } from '@codemirror/language';

// 定义Nax语言的语法高亮规则
const naxLang = StreamLanguage.define({
  name: "nax",
  // 开始解析
  startState: function() {
    return {
      tokenize: null,
      context: null,
      inComment: false  // 添加多行注释状态跟踪
    };
  },
  
  // 解析每个token
  token: function(stream, state) {
    // 如果在多行注释中
    if (state.inComment) {
      const found = stream.skipTo('*/');
      if (found) {
        stream.match('*/');
        state.inComment = false;
      } else {
        stream.skipToEnd();
      }
      return 'comment';
    }
    
    // 跳过空白字符
    if (stream.eatSpace()) return null;
    
    // 处理单行注释
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    
    // 处理多行注释开始
    if (stream.match('/*')) {
      state.inComment = true;
      const found = stream.skipTo('*/');
      if (found) {
        stream.match('*/');
        state.inComment = false;
      } else {
        stream.skipToEnd();
      }
      return 'comment';
    }
    
    // 处理关键字
    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
      const word = stream.current();
      
      // 类型关键字
      const typeKeywords = [
        'void', 'any', 'null', 'anyptr',
        'bool', 'string',
        'int', 'uint', 'float',
        'i8', 'i16', 'i32', 'i64',
        'u8', 'u16', 'u32', 'u64',
        'f32', 'f64'
      ];
      
      // 复合类型关键字
      const compositeTypeKeywords = [
        'struct', 'chan', 'arr', 'vec', 'map', 'set', 'tup', 'ptr', 'rawptr'
      ];
      
      // 声明关键字
      const declarationKeywords = [
        'var', 'type', 'fn', 'import', 'new', 'go'
      ];
      
      // 控制流关键字
      const controlFlowKeywords = [
        'if', 'else', 'for', 'in', 'break', 'continue', 'return', 'match', 'select'
      ];
      
      // 错误处理关键字
      const errorHandlingKeywords = [
        'try', 'catch', 'throw'
      ];
      
      // 类型操作关键字
      const typeOperationKeywords = [
        'as', 'is'
      ];
      
      // 布尔值
      const booleanValues = [
        'true', 'false'
      ];
      
      if (typeKeywords.includes(word) || compositeTypeKeywords.includes(word)) {
        return 'type';
      } else if (declarationKeywords.includes(word)) {
        return 'keyword';
      } else if (controlFlowKeywords.includes(word)) {
        return 'keyword';
      } else if (errorHandlingKeywords.includes(word)) {
        return 'keyword';
      } else if (typeOperationKeywords.includes(word)) {
        return 'operator';
      } else if (booleanValues.includes(word)) {
        return 'atom';
      }
      
      return 'variable';
    }
    
    // 处理数字
    if (stream.match(/^-?\d+(\.\d+)?/)) {
      return 'number';
    }
    
    // 处理双引号字符串
    if (stream.match('"')) {
      while (!stream.eol()) {
        if (stream.next() === '"' && stream.peek() !== '"') break;
      }
      return 'string';
    }
    
    // 处理单引号字符串
    if (stream.match("'")) {
      while (!stream.eol()) {
        if (stream.next() === "'" && stream.peek() !== "'") break;
      }
      return 'string';
    }
    
    // 处理反引号字符串
    if (stream.match('`')) {
      while (!stream.eol()) {
        if (stream.next() === '`' && stream.peek() !== '`') break;
      }
      return 'string';
    }
    
    // 处理其他字符
    stream.next();
    return null;
  }
});

// 创建语言支持
export function nax() {
  return new LanguageSupport(naxLang);
}