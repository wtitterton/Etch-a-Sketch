var squareWidth = undefined;
var gridSize = 512;		//in pixels, along one side
var gridDims = 16;		//in divs
var divSize = gridSize / gridDims;
var grid = $('.grid');

var mode = 'normal';

/**************************************************
						workings
**************************************************/
function createGrid(dims)
{	
	$(grid).empty();
	for (var i=0; i<dims; i++) {		//create the grid
		for (var j=0; j<dims; j++) {
			$('<div />', {
				'class'	: 'square',
				'height': divSize,
				'width'	: divSize
			}).appendTo(grid);			
		}
		
		$(grid).append($("<div></div>").css("clear", "both"));
	}

	$('.square').css({
		'background': 'rgba(0,0,0,.9)',
		'opacity': '1'
	})
}


function resetGrid()
{
	random = false;
	$('.grid').html('');
	 var dims = prompt('please enter number of squares (between 15 and 110)');
	 if(dims > 15 && dims < 110)
	 {
	 	cancel = false;
	 	divSize =  gridSize / dims;
		createGrid(dims);
	 }
	 else
	 {
	 	createGrid(16);
	 }
}

function generateColor()
{
	var randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
	return randomColor;
}

function controlBorder()
{

}




/*********************************************
					modes
**********************************************/
function switchMode(mode,elem)
{
	
	switch(mode)
	{
		case 'normal':
		normalMode(elem,'green')	
		break;
		case 'random':
		randomColorMode(elem)
		break;
		case 'opacity':
		opacityMode(elem);
		break;
		case 'trail':
			trailMode(elem);
		break;
	}
}


function randomColorMode(elem)
{
		var rndCol = generateColor();
		$(elem).css({
		'background': rndCol
	});
}

function opacityMode(elem)
{
	var r = '125';
	var g = '125';
	var b = '125';
	var opacity = $(elem).css('opacity' );
	
	if(opacity < 1)
	{
		
		 a = $(elem).css('opacity', '+=0.1');
		 var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ' )';
		 $(elem).css('opacity', a);
	}
	else
	{
		a = $(elem).css('opacity', '0.1');
		var rgba = toString('rgba(' + r + ',' + g + ',' + b + ',' + a + ' )');
	}
		$(elem).css('background', rgba);
	

}

function normalMode(elem,color)
{
	$(elem).css({
		'background': color
	});
}

function trailMode(elem)
{
			$(elem).animate({
				"background-color":"#000", 
			},200);

			$(elem).animate({
				"opacity":0.0
			},500);

			$(elem).animate({
				"opacity":1
			},600);
}			





/****************************************************
						events
*****************************************************/


$('.grid').on('mouseenter', '.square',function(){
	 elem = $(this);
	switchMode(mode,elem);
})



$('.normal').on('click',function(){
	mode = 'normal';
	$('.square').css({
		'background': 'rgba(0,0,0,.9)',
		'opacity': '1'
	})
})


$('.random').on('click',function(){
	mode = 'random';
	$('.square').css({
		'background': 'rgba(0,0,0,.9)',
		'opacity': '1'
	})
})

$('.opacity').on('click',function(){
	mode = 'opacity';
	$('.square').css({
		'background': 'rgba(0,0,0,.9)'
	})

})

$('.trail').on('click',function(){
	mode = 'trail';
	$('.square').css({
		'background': 'rgba(0,0,0,.9)',
		'opacity': '1'
	})
	
})


$('.reset').on('click',function(){
	mode = 'normal';
	resetGrid();
	if($('.checkbox').attr('checked', false))
	{
		$('.checkbox').prop('checked','checked');
	};
});

$('.checkbox').change(function(){
	if($(this).is(':checked'))
	{
		$('.square').css({
			'border': '1px solid #000',
			'margin': '1px 1px'
		})

		
	}
	else
	{
		$('.square').css({
			'border': 'none',
			'margin': '0'
		})
	}
})


/****************************
		grid initialisation
*****************************/

createGrid(16);


