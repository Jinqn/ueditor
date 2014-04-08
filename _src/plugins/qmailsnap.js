UE.plugins['qmailsnap'] = function(){
    var me = this,
        doc,
        snapplugin;

    me.commands['qmailsnap'] = {
        execCommand: function(){
            var me = this,lang = me.getLang("snapScreen_plugin");
            if(!snapplugin){
                var container = me.container;
                doc = container.ownerDocument || container.document;
                snapplugin = doc.createElement("object");
                try{snapplugin.type = browser.webkit ? "application/x-tencent-qmail":"application/x-tencent-qmail-webkit";}catch(e){
                    return;
                }
                snapplugin.style.cssText = "position:absolute;left:-9999px;";
                snapplugin.setAttribute("width","0");
                snapplugin.setAttribute("height","0");
                container.appendChild(snapplugin);
            }

            var qmsnap = snapplugin.CreateScreenCapture();
            qmsnap.OnCaptureFinished = function(){
                var r = qmsnap.SaveClipBoardBmpToFile(1);
                console.log('QQ snap finish: ' + r);
            };
            qmsnap.OnCaptureCanceled = function(){
                console.log('QQ snap cancel');
            };
            qmsnap.DoCapture();
        }
    };
}

