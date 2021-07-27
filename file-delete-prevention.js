Java.perform(function() {
Interceptor.attach(
        Module.findExportByName("libc.so", "unlink"), {
            // fd, buff, len
            onEnter: function(args) {
                console.log("Unlink Got Called for file "+args[0]);
                const fileName = Memory.readUtf8String(args[0])
                if(fileName.indexOf("/files/upload/")!=-1){
                    console.log("I WIll not let you delete any files at this path");
                    Memory.writeUtf8String(args[0], '/invalid/path');
                }
            },
            onLeave: function(ret) {

            }
        }
    );
}
