
var counter = 0;
var PreRequisites = {
    WF_EmailProperties: "<ul><li>Name <input type='text'/></li></br><li>Add Property<select><option>--Select--</option><option>Text Box</option><option>Check Boxes</option>Radio Buttons<option>DropDown</option><option>ImageUploader</option></select></li></ul>",
    WF_IsConnector: false,
    WF_ConnectionFLow: [],
    WF_ConnectorForDelete: ""
};
$(document).ready(function () {

    geartoggle();
    $('.settings').hide();
    $('html').keyup(function (e) {
        if (e.keyCode == 46) {

            if (!PreRequisites.WF_IsConnector) {
                var parentnode = $('.droppable-selected');
                var endpoints = jsPlumb.getEndpoints(parentnode);
				if(endpoints.length>0)
				{
				alertify.confirm("Element selected has connections are you sure you want to delete?", function (e) {
    if (e) {
        
                for (var i = 0; i < endpoints.length; i++) {
                    jsPlumb.deleteEndpoint(endpoints[i]);
                }
                $('.droppable-selected').remove();
    } 
});
				 }
			}
            
            else {
                jsPlumb.detach(PreRequisites.WF_ConnectorForDelete);
            }
        }
        else if (e.keyCode == 115) {
            if ($('.droppable-selected').length) {
                $('.widget-prop').toggleClass('settings-body');
                switchdata();
            }
        }

    })
    fnkeyup();
    $('#plain').click(function () {
        $('#droparea').addClass('plain').removeClass('grid');

        $('.plain').droppable('disable');
        $('.dragged').remove();
        fndroppable('plain');
    });
    $('#grid').click(function () {
        $('#droparea').addClass('grid').removeClass('plain');

        $('.grid').droppable('disable');
        $('.dragged').remove();
        fndroppable('grid');
    });

    //Counter
    //Make element draggable
    $(".drag").draggable({
        helper: 'clone',
        snapMode: 'inner',
        revert: 'invalid',
        opacity: .4,

        cursor: 'move',
        //When first dragged
       stop: function (ev, ui) {
            }
    });

    //Make element droppable


    fndroppable('plain');
});
function geartoggle() {
    $("a.Gear_btn").toggle(function () {
        $(".sidebar").animate({ "right": "0px" });
        $("a.Gear_btn").animate({ "right": "324px" });
        $(".PageContainer").animate({
            "marginRight": "324px", "marginTop": "0px"
        },
        function () {
            $(".sidebar").animate({ "right": "-324px" });
            $("a.Gear_btn").animate({ "right": "-1px" });
            //$("#SC-divHeaderHolder").animate({ "marginTop": "-55px" });
            $(".PageContainer").animate({ "marginRight": "0px", "marginTop": "0px" });
        });
        switchdata();
    });
}
function switchdata() {
    switch ($('.droppable-selected').attr('data-prop')) {
        case ('user'):
            $('.widget-prop.settings-body').html("<span>you can set your properties here for user</span>");
            break;
        case ('email'):
            $('.widget-prop.settings-body').html(PreRequisites.WF_EmailProperties);
            break;
        case ('login'):
            $('.widget-prop.settings-body').html("<span>you can set your properties here for Login</span>");
            break;
        case ('success'):
            $('.widget-prop.settings-body').html("<span>you can set your properties here for Login</span>");
    }
}
function fnkeyup() {
    $('#window1').keyup(function (e) {
        if (e.keyCode == 115) {
            alert('f4 pressed');
            geartoggle();
        }
    });

}
function fndrop() {
    $('.dragged').unbind('click');
    $('.dragged').on('click', function () {
        $('.settings').show();
        $('.widget-prop').removeClass('settings-body').html('');
        $('.droppable-selected').removeClass('droppable-selected');
        $(this).toggleClass('droppable-selected');
        if ($('.droppable-selected').length>0) {
           PreRequisites.WF_IsConnector = false;
        }
    });
}
function deletepoint() {
    $("._jsPlumb_connector").bind("keyup", function (e) {
        alert(e.keyCode + 'key code');

        //$(this).detach();
        if (e.keyCode == 46) { $("svg.jsPlumb_connector").remove(); }
    });
    //if (e.keyCode == 46) {
    //    $
    //}
}
function fndroppable(selector) {
    // jsplum();
    $("." + selector).droppable({

        drop: function (ev, ui) {
            // debugger

            //$.ui.ddmanager.current.cancelHelperRemoval = false;
            counter++;
           
            if ($(ui.draggable).hasClass('copied')) return
           
                
                var element = $(ui.draggable).clone();
                console.log(element + 'el');
                //draggedNumber = ui.helper.attr('id').search(/drag([0-9])/)
                itemDragged = "dragged" + RegExp.$1
                $(element)
                .attr("id", "window" + counter)
                .addClass("window copied")
                .appendTo(this).css({
                position: "absolute",
                top: $(ui.helper).position().top - $(this).position().top,
                left: $(ui.helper).position().left - $(this).position().left
            }).draggable({
                    containment: ".droparea"
                  });

                $("#window" + counter).addClass("dragged" + RegExp.$1);

                fnjsplumbing(counter);

            
            fndrop();
            //fnkeyup();
            // deletepoint();

        }
    });
}

function fnjsplumbing(counter) {
    var a = $("#a");
    var b = $("#b");
    //Setting up drop options
    var targetDropOptions = {
        tolerance: 'touch',
        hoverClass: 'dropHover',
        activeClass: 'dragActive'
    };
    //Setting up a Target endPoint
    var targetColor = "#316b31";
    var targetEndpoint = {
        id: "Target" + counter,
        endpoint: ["Dot", { radius: 8}],
        paintStyle: { fillStyle: targetColor },
        //isSource:true,
        scope: "green dot",
        connectorStyle: { strokeStyle: targetColor, lineWidth: 8 },
        connector: ["Bezier", { curviness: 63}],
        maxConnections: 3,
        isTarget: true,
        detachable: true
        //dropOptions: targetDropOptions
    };
   jsPlumb.draggable($(".copied")); 
    //Setting up a Source endPoint
    var sourceColor = "#ff9696";
    var sourceEndpoint = {
        id: "Source" + counter,
        endpoint: ["Dot", { radius: 8}],
        paintStyle: { fillStyle: sourceColor },
        isSource: true,
        scope: "green dot",
        connectorStyle: { strokeStyle: sourceColor, lineWidth: 8 },
        connector: ["Bezier", { curviness: 63}],
        maxConnections: 3,
        detachable: true
        //isTarget:true,
        //dropOptions : targetDropOptions
    };
    //Set up endpoints on the divs
    jsPlumb.addEndpoint($("#window" + counter), { anchor: "TopCenter" }, targetEndpoint);
    jsPlumb.addEndpoint($("#window" + counter), { anchor: "BottomCenter" }, sourceEndpoint);
    jsPlumb.draggable($("#window" + counter));
    jsPlumb.animate($("#a"), { "left": 50, "top": 100 }, { duration: "slow" });
}
jsPlumb.bind("jsPlumbConnection", function (connectionInfo) {
    if (jQuery.isEmptyObject(PreRequisites.WF_ConnectionFLow)) {
        PreRequisites.WF_ConnectionFLow.push({ SourceId: connectionInfo.sourceId, TargetId: connectionInfo.targetId });
    }
    else {
        var getCircularRef = $.grep(PreRequisites.WF_ConnectionFLow, function (ele) {
            if (ele.TargetId == connectionInfo.sourceId && ele.SourceId == connectionInfo.targetId&&ele.TargetId==connectionInfo.targetId) {
                return ele;
            }
        });
        if (getCircularRef != "") {
            jsPlumb.detach(connectionInfo);
			alertify.error("connecting this causes circular iterative work flow");
        }
        else {
            PreRequisites.WF_ConnectionFLow.push({ SourceId: connectionInfo.sourceId, TargetId: connectionInfo.targetId });
        }
    }
});

jsPlumb.bind("jsPlumbConnectionDetached", function (connectionInfo) {
    //...update your data model here.  The contents of the 'connectionInfo' are described below.
});

jsPlumb.bind("click", function (e) {
    PreRequisites.WF_IsConnector = true;
    PreRequisites.WF_ConnectorForDelete = e;
    //connector	The underlying Connector for this Connection (eg.
    //sourceId	Id of the source element in the connection.
    //targetId	Id of the target element in the connection.
    //scope	Optional scope descriptor for the connection.
    //endpoints	Array of [source, target] Endpoint objects.
    //source The source element for this Connection.
    //target The target element for this Connection.
    //overlays
});