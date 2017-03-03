var Slider = function( width, length, notCentered ){
		this.visual = new PIXI.Container();
		this.SLIDE_LENGTH = length;
		this.SLIDE_WIDTH = width;
		this.SLIDE_COL = 0x888888;
		this.SLIDE_X0 = 0;
    //	this.SLIDE_Y0 = this.SLIDE_WIDTH *1;
		this.SLIDE_Y0 = 220;

		this.KNOB_COL = 0xaaaaaa;

		if( !notCentered ){
			this.SLIDE_X0 = Math.round( (window.innerWidth / 2) - this.SLIDE_LENGTH / 2 );
			this.visual.x = 0.1;
		}

		var knob = new PIXI.Graphics();
	//	slide.lineStyle( this.SLIDE_WIDTH, this.SLIDE_COL, 1);
		//slide.moveTo( this.SLIDE_X0, this.SLIDE_Y0);
    //slide.lineTo(this.SLIDE_X0 + this.SLIDE_LENGTH, this.SLIDE_Y0 + this.SLIDE_WIDTH);
    //	slide.beginFill(0x000000, 0.25);
		knob.beginFill(0x000000, 0.01);
		knob.drawRect(0,0,20,5)
		knob.endFill();
		var tempvalue=0;
		//var knob = new PIXI.Sprite.fromImage('img/knob.png');
		var that = this;
		knob.interactive = true;
		knob.buttonMode = true;
		//knob.anchor.x = 0.5;
		//knob.anchor.y = 0.5;
		//knob.position.x = this.SLIDE_X0;
		//knob.position.y = this.SLIDE_Y0;
		knob.position.x = 20
		knob.position.y = 220;           
		//knob.width = knob.height = 5 * 2;

		knob.visible = false;
	

		// use the mousedown and touchstartthis.
		knob.mousedown = knob.touchstart = function(event){
		//	this.data = data;
			//this.alpha = 0.9;
			//this.dragging = true;
			
			    this.data1 = event.data;
			    // this.alpha = 0.5;
			    this.dragging = true;
			    this.sx1 = this.data1.getLocalPosition(event.currentTarget).x;
			    this.sy1 = this.data1.getLocalPosition(event.currentTarget).y;
			    tempvalue = temp;
			
		};

		// set the events for when the mouse is released or a touch is released
		knob.mouseup = knob.mouseupoutside = knob.touchend = knob.touchendoutside = function(data){
			this.alpha = 1
			this.dragging = false;
			this.data1 = null;
			if (temp >= tempvalue) {
			    jitter += 0.01;
			}
			else {
			    jitter = jitter-0.01;
			}
			
		};

		// set the callbacks for when the mouse or a touch moves
		knob.mousemove = knob.touchmove = function(data){
		    if (this.dragging) {
		        var newPosition1 = this.data1.getLocalPosition(this.parent);
			  	var newPosition = this.data1.global;
			  	//if (newPosition.y > that.SLIDE_Y0 && newPosition.x < that.SLIDE_Y0 + that.SLIDE_LENGTH)
			  	if (newPosition1.y <= that.SLIDE_Y0 && newPosition1.y > that.SLIDE_Y0 - that.SLIDE_WIDTH) {
		  		  //  this.position.y = newPosition.y;
			  	        //var a = parseInt(( that.SLIDE_Y0-knob.position.y ) / that.SLIDE_WIDTH * 100);
			  	        this.position.y = parseInt(newPosition1.y - this.sy1);
			  	        var a = parseInt(( that.SLIDE_Y0-knob.position.y ) / that.SLIDE_WIDTH * 100);
			  	        if ( a <= 100) {
			  	          //  var b = (a / 100);
			  	            // bar.scale.y = +((-b).toFixed(1));
			  	            bar.scale.y = -a / 100 * 0.92;
			  	            
			  	            temp = a;
			  	            tempText.text = 'T: ' + a + 'F'
			  	          
			  	            //console.log(b);
			  	           ///// bar.scale.y = +((-temp / 200 * 0.92).toFixed(2));
			  	        }
			  	        if (a==0) {
			  	            knob.visible = false;
			  	        }
			  	                //else {
			  	                //    bar.scale.y = 0
			  	                //}
			  	        
			  	    //    console.log(a);
			  	    //    console.log("value of y " + knob.position.y);
			  	      
				}
			}
		}

		//          this.visual.addChild( slide );
		this.visual.addChild( knob );

		//this.getSliderVal = function() {
		//	return parseInt((knob.position.x - that.SLIDE_X0) / that.SLIDE_LENGTH * 100);
		//}

		this.getSliderVal = function() {
		var a=    parseInt((knob.position.y - that.SLIDE_Y0) / that.SLIDE_WIDTH * 100);
		return a;
		}

		this.setSliderVal = function( y ){
		    //knob.position.x = parseInt( x * that.SLIDE_LENGTH / 100 + that.SLIDE_X0);
		    knob.position.y = knob.position.y - 20;
		    var a = parseInt((that.SLIDE_Y0 - knob.position.y) / that.SLIDE_WIDTH * 100);
		    if (a >= 0 && a <= 100) {
		        bar.scale.y = -a / 100 * 0.92;
		        knob.visible = true
		        jitter += 0.1;
		    }
		}

		return this
	};