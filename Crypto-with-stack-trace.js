function bin2ascii(array) {
    var result = [];

    for (var i = 0; i < array.length; ++i) {
        result.push(String.fromCharCode( // hex2ascii part
            parseInt(
                ('0' + (array[i] & 0xFF).toString(16)).slice(-2), // binary2hex part
                16
            )
        ));
    }
    return result.join('');
}

function bin2hex(array, length) {
    var result = "";

    length = length || array.length;

    for (var i = 0; i < length; ++i) {
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    }
    return result;
}

function Where(stack){
    var at = ""
    for(var i = 0; i < stack.length; ++i){
        at += stack[i].toString() + "\n"
    }
    return at
}

Java.perform(function() {
    var ThreadDef = Java.use('java.lang.Thread')
    var threadinstance = ThreadDef.$new()

   
    Java.use('javax.crypto.spec.SecretKeySpec').$init.overload('[B', 'java.lang.String').implementation = function(key, spec) {
        send("KEY: " + bin2hex(key) + " | " + bin2ascii(key));
        var stack = threadinstance.currentThread().getStackTrace()
        var full_call_stack = Where(stack)
        console.log("\r\nFull call stack:\r\n" + full_call_stack)
        return this.$init(key, spec);
    };

    Java.use('javax.crypto.Cipher')['getInstance'].overload('java.lang.String').implementation = function(spec) {
        send("CIPHER: " + spec);
        var stack = threadinstance.currentThread().getStackTrace()
        var full_call_stack = Where(stack)
        console.log("\r\nFull call stack:\r\n" + full_call_stack)
        return this.getInstance(spec);
    };

    Java.use('javax.crypto.Cipher')['doFinal'].overload('[B').implementation = function(data) {
        send("doFinal!");
        send(bin2ascii(data));
        var stack = threadinstance.currentThread().getStackTrace()
        var full_call_stack = Where(stack)
        console.log("\r\nFull call stack:\r\n" + full_call_stack)
        return this.doFinal(data);
    };
});
