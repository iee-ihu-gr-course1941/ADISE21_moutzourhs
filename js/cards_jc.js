 
var me={token:null,piece_color:null};
var side;
var game_status={};
var board={};
var last_update=new Date().getTime();
var timer=null;

$(function(){
	draw_empty_board();
	fill_board();
	$('#cards_login').click(login_to_game);
	$('#cards_reset').click(reset_board);
    $('#do_move').click(do_move);
	$('#move_div').hide();
	game_status_update();
	//$('#the_move_src').change( update_moves_selector);
	//$('#do_move2').click( do_move2);
});

function draw_empty_board(p) {
if(p!='D'){
	p = 'T';
}
var draw_init = {
'D' :{i1:3,i2:0,istep:-1,j1:0,j2:20,jstep:1},
'T' :{i1:1,i2:4,istep:1,j1:19,j2:-1,jstep:-1}	
};	
var s = draw_init[p];
	
var t ='<table id="cards_table">';
for(var i=s.i1;i!=s.i2;i+=s.istep) {
t += '<tr>';
for(var j=s.j1;j!=s.j2;j+=s.jstep) {
t += '<td class="cards_square" id="square_'+j+'_'+i+'">' + j +','+i+'</td>'; 
}
t += '</tr>';
}
t += '</table>';
$('#cards_board2').html(t);
$('.cards_square').click(click_on_piece);
}

function fill_board() {
$.ajax({url: "cards_board.php/board",headers: {"X-Token": me.token}, success: fill_board_by_data});

}
function reset_board(){
	side +=null;
	$.ajax({url: "cards_board.php/board",headers: {"X-Token": me.token},method :'POST',success: fill_board_by_data});
	$('#move_div').hide();
	$('#game_initializer').show(2000);
	}



function fill_board2(){
	$.ajax({url: "data.php/board",headers: {"X-Token": me.token}, success: fill_board_by_data});
	
}
function fill_board3(){
	$.ajax({url: "data.php/board",headers: {"X-Token": me.token}, success: fill_board_by_data2});
	
}

function fill_board_by_data(data) {

	board=data;
for(var i=0;i<data.length;i++) {
	
   var o = data[i];
var id = '#square_'+ o.x +'_' + o.y;
var id2 ='#square_'+ o.x +'_' + o.z;
var c = o.piece; 
var pc= (o.piece!=null)?'piece'+o.piece_color:'';

//var im = (o.piece!=null)?'<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+c+'.png">':'';
var im2 = (o.piece!=null)?'<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;">':'';

	
	if(side == 'D'){
    if(o.piece_color == 'D'){		
	var im = (o.piece!=null)?'<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+c+'.png">':'';
	$(id).addClass().html(im);
		
	}
	else{
	var img1 = '<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+0+'.png">';
	$(id).addClass().html(img1);
	}
	}
	else if(side == 'T'){
	if(o.piece_color == 'T'){	
	var im = (o.piece!=null)?'<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+c+'.png">':'';
	$(id).addClass().html(im);
	}	
	else{
	var img1 = '<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+0+'.png">';
	$(id).addClass().html(img1);
	}
	}
	else{
	var img1 = '<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+0+'.png">';
	$(id).addClass().html(img1);
	}
	

$(id2).addClass().html(im2);

	}

$('.ui-droppable').droppable( "disable" );
		
	if(me && me.piece_color!=null) {
		$('.piece'+me.piece_color).draggable({start: start_dragging, stop: end_dragging, revert:true});
	}
	if(me.piece_color!=null && game_status.p_turn==me.piece_color) {
		$('#move_div').show(1000);
	} else {
		$('#move_div').hide(1000);
	}
}
function fill_board_by_data2(data) {

	board=data;
for(var i=0;i<data.length;i++) {
	
   var o = data[i];
var id = '#square_'+ o.x +'_' + o.y;
var id2 ='#square_'+ o.x +'_' + o.z;
var c = o.piece; 
var pc= (o.piece!=null)?'piece'+o.piece_color:'';

//var im = (o.piece!=null)?'<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+c+'.png">':'';
var im2 = (o.piece!=null)?'<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;">':'';

	
	
    if(o.piece_color == 'D'){		

	var img1 = '<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+0+'.png">';
	$(id).addClass().html(img1);
	}
    if(o.piece_color == 'T'){	
	var img1 = '<img class="piece '+pc+'" Style="width:100px;height:200px;padding:5px;" src="images/imgs'+0+'.png">';
	$(id).addClass().html(img1);
	}
	

$(id2).addClass().html(im2);

	}
}

function login_to_game(){
if($('#user').val()=='') {
		alert('You have to set a username');
		return;
	}
var p_color = $('#pcolor').val();
side = $('#pcolor').val();
draw_empty_board(p_color);	

$.ajax({url:"cards_board.php/players/"+p_color,
method:'PUT',
datatype:"json",
headers: {"X-Token": me.token},
contentType: 'application/json',
data: JSON.stringify({username: $('#user').val(),piece_color:p_color }),
success:login_result,
error:login_error});
	

}
function login_result(data){
	fill_board2();
	me = data[0];

$('#game_initializer').hide();

update_info();
game_status_update();
	
}

function login_error(data,y,z,c){
	fill_board3();
	var x = data.responseJSON;

	alert(x.errormesg);
}

function game_status_update(){
	clearTimeout(timer);
	$.ajax({url: "cards_board.php/status/", success: update_status,headers: {"X-Token": me.token}});	
}

function update_status(data){
	last_update=new Date().getTime();
	var game_stat_old = game_status;
	game_status = data[0];
	update_info();
	clearTimeout(timer);
	if(game_status.p_turn == me.piece_color && me.piece_color != null){
		x = 0;
		if(game_stat_old.p_turn!=game_status.p_turn) {
			fill_board();
		}
	$('#move_div').show(1000);
	 timer = setTimeout(function () {
		game_status_update();
	}, 15000);
}
else{
	$('#move_div').hide(1000);
	 timer = setTimeout(function () { game_status_update();
	} ,4000);

}
}


function update_info(){
	$('#game_info').html("Your playing in side: " +me.piece_color+ ", your name is " + me.username+'<br>Token='+me.token+'<br>Game state: '+game_status.status+', '+ game_status.p_turn+' must play now.');
	
}
function do_move(){
	var s = $('#the_move').val();
	
	var a = s.trim().split(/[]+/);
	if(a.length != 4){
		alert('must give 4 numbers');
		return ;
	}
	
	$.ajax({url:"cards_board.php/piece/"+a[0]+ '/'+a[1],
	method:'PUT',
	dataType:"json",
	contentType:'application/json',
	data:JSON.stringify({x:a[2], y:a[3]}),
	headers: {"X-Token": me.token},
	success:move_result,
	error:login_error});
	
}

function move_result(data){
	game_status_update();
	fill_board_by_data(data);
	
}
function update_moves_selector() {
	$('.cards_square').removeClass('pmove').removeClass('tomove');
	var s = $('#the_move_src').val();
	var a = s.trim().split(/[ ]+/);
	$('#the_move_dest').html('');
	if(a.length!=2) {
		return;
	}
	var id = '#square_'+ a[0]+'_'+a[1];
	$(id).addClass('tomove');
	for(i=0;i<board.length;i++) {
		if(board[i].x==a[0] && board[i].y==a[1] && board[i].moves && Array.isArray(board[i].moves)) {
			for(m=0;m<board[i].moves.length;m++) {
				$('#the_move_dest').append('<option value="'+board[i].moves[m].x+' '+board[i].moves[m].y+'">'+board[i].moves[m].x+' '+board[i].moves[m].y+'</option>');
				var id = '#square_'+ board[i].moves[m].x +'_' + board[i].moves[m].y;
				$(id).addClass('pmove');
			}
		}
	}
}

function do_move2() {
	$('#the_move').val($('#the_move_src').val() +' ' + $('#the_move_dest').val());
	$('.chess_square').removeClass('pmove').removeClass('tomove');
	do_move();
}

function click_on_piece(e) {
	var o=e.target;
	if(o.tagName!='TD') {o=o.parentNode;}
	if(o.tagName!='TD') {return;}
	
	var id=o.id;
	var a=id.split(/_/);
	$('#the_move_src').val(a[1]+' ' +a[2]);
	update_moves_selector();
}

function start_dragging ( event, ui ) {
	var x;
	
	var o=event.target.parentNode;
	var id = o.id;
	var a = id.trim().split(/_/);
	
	$(o).addClass('tomove');
	for(i=0;i<board.length;i++) {
		if(board[i].x==a[1] && board[i].y==a[2] && board[i].moves && Array.isArray(board[i].moves)) {
			for(m=0;m<board[i].moves.length;m++) {
				$('#the_move_dest').append('<option value="'+board[i].moves[m].x+' '+board[i].moves[m].y+'">'+board[i].moves[m].x+' '+board[i].moves[m].y+'</option>');
				var id = '#square_'+ board[i].moves[m].x +'_' + board[i].moves[m].y;
				$(id).addClass('pmove').droppable({drop: dropping}).droppable('enable');
			}
		}
	}
}

function dropping( event, ui ) {
        var x;

	ui.draggable[0].validMove=1;
	var id = this.id;
	var a2 = id.split(/_/);
	var a1 = ui.draggable[0].parentNode.id.split(/_/);

	$('#the_move').val(a1[1]+' '+a1[2]+' '+a2[1]+' '+a2[2]);
	$('.chess_square').removeClass('pmove').removeClass('tomove');
	do_move();
}


function end_dragging ( event, ui ) {
        var x;

	if(this.validMove) {
		this.validMove=0;
		return;
	}
	$('.chess_square').removeClass('pmove').removeClass('tomove');
	this.top=0;
	this.left=0;

}