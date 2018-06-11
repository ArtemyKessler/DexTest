import { Component } from '@angular/core';


function generate(): string {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


class User{
	name: string; 
	id: string; 

	constructor(name: string) {
		this.name = name; 
		this.id = generate();
	}
}

class Advert{
	id: string;
	num: number;
	user: string; 
	text: string; 
	rating : number; 
	date: string;
	
	constructor(num: number, user: string, text: string, rating : number, date: string) {
		
		this.id = generate();
		this.num = num; 
		this.user = user;
		this.text = text; 
		this.rating = rating; 
		this.date = date;	
	}	
}
 
@Component({
    selector: 'purchase-app',
    template: `<div class="page-header">
        <h1> Административный интерфейс </h1>
    </div>
    <div class="panel">
        <div class="form-inline">
			<div class="form-group">
                <div class="col-md-offset-2 col-md-8">
                   <button class="btn btn-default" (click)="advertFormPop()">Добавить</button>
                </div>
			</div>
			<div class="form-group">
				<div class="col-md-offset-2 col-md-8">
					<label class="col-md-8">Пользователь</label>
				</div>
			</div>
			<div class="form-group">
				<select class="form-control" [(ngModel)]="userSearch">
					<option>Все</option>
					<option *ngFor="let user of users">{{user.name}}</option>
				</select>
			</div>
			<div class="form-group">
					<label class="col-md-6">от</label>
			</div>
			<div class="form-group">
					<input type="date"/>
			</div>
			<div class="form-group">
				<label class="col-md-6">до</label>
			</div>
			<div class="form-group">
					<input type="date"/>
			</div>
            <div class="form-group">
                <div class="col-md-8">
                    <input class="form-control" [(ngModel)]="search" placeholder = "Общий поиск"/>
                </div>
            </div>
			<div class="form-group">
				<select class="form-control" [(ngModel)]="rowsShowed" value='10'>
					<option>10</option>
					<option>25</option>
					<option>50</option>
					<option>100</option>
				</select>
			</div>
        </div>
        <table class="table table-striped advertTable">
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Создано</th>
                    <th>Объявление</th>
					<th>Рейтинг</th>
					<th>Пользователь</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let advert of adverts" (click)="changeAdvert(advert)">
                    <td>{{advert.num}}</td>
                    <td>{{advert.date}}</td>
					<td>{{advert.text}}</td>
					<td>{{advert.rating}}</td>
					<td>{{advert.user}}</td>
                </tr>
            </tbody>
        </table>
		<div class="form-inline pages">
			<div class="form-group">
				<div class="col-md-1">
					<button class="btn btn-default">1</button>
				</div>
			</div>
			<div class="form-group">
				<div class="col-md-1">
					<button class="btn btn-default">2</button>
				</div>
			</div>
			<div class="form-group">
				<div class="col-md-1">
					<p>...</p>
				</div>
			</div>
			<div class="form-group">
				<div class="col-md-1">
					<button class="btn btn-default">100</button>
				</div>
			</div>
		</div>
    </div>
	
	<div class='advertForm panel' id='advertForm'>
		<h4>Объявление</h4>
		<div class='linegroupBox'>
			<div class='linegroup'>
				<div class='box'>
					<div class='param'><p style='font-weight:bold'>Номер</p></div>
					<div><input id='number1' type='number' [(ngModel)]='num' value='{{num}}'/></div>
				</div>
			</div>
			<div class='linegroup'>
				<div class='box'>
					<div class='param'><p style='font-weight:bold'>Создано</p></div>
					<div><input id='date1' type='text' [(ngModel)]='date' value='{{date}}'/></div>
				</div>
			</div>
			<div class='linegroup'>
				<div class='box'>
					<div class='param'><p style='font-weight:bold'>Пользователь</p></div>
					<div><input id='user1' type='text' list='names' [(ngModel)]='user' value='{{user}}'/>
						<datalist id='names'>
							<option *ngFor="let user of users">{{user.name}}</option>
						</datalist>
					</div>
				</div>
			</div>
			<div class='linegroup'>
				<div class='box'>
					<div class='param' align='top'><p style='font-weight:bold'>Текст</p></div>
					<div>
						<textarea id='text1' rows="6" cols="45" name="text" [(ngModel)]='text' value='{{ad}}'></textarea>
					</div>
				</div>
			</div>
			<div class='linegroup'>
				<div class='box'>
					<div class='param'><p style='font-weight:bold'>Рейтинг</p></div>
					<div>
						<input id='rate1' type='number' min='1' max='10' [(ngModel)]='rating' value='{{rate}}'/>
					</div>
					<div class='hint'>
						<p>от 1 до 10</p>
					</div>
				</div>
			</div>
			<div class='linegroup linegroup-lowest'>
				<div class='box'>
					<div class='form-btn-container'>
						<button (click)='deleteAdvert()' class='btn btn-delete'>Удалить</button>
					</div>
					<div>
						<button class='btn btn-default' (click)='addAdvert(num,user,text,rating,date)'>Добавить новую запись</button>
					</div>
					<div>
						<button class='btn btn-default' (click)='advertFormHide()'>Отменить</button>
					</div>
				</div>
			</div>
		</div>			
	</div>
	
<style>
.linegroup{
	overflow:hidden;
	margin-bottom:1%;
}

.linegroup-lowest{
	margin-bottom:2%;
}

.box{
	white-space:nowrap;
}

.box div{
	display:inline-block;
}

.advertTable{
	margin-top:15px;
}

.advertForm{
	display:none;
	border:4px solid black;
}

.linegroupBox{
	margin-left:6%;
	margin-top:1%;
}

.param{
	width:10%;
}

.hint{
	opacity:0.5;
	margin-left:1%;
}

.pages{
	margin-left:70%;
	margin-top: 15px;
}

.form-btn-container{
	width:20%;
}

.btn-delete{
	background-color:red;
	color:white;
	box-shadow:3px 0px 5px black;
}
</style>`
})
export class AppComponent {

	advertChanging: Advert;
    num: number;
    user: string;
    text: string;
    rating : number;
    date: string;
	
	users: User[] = 
	[
		{name:"Тестовый.А", id:"40b21b52-85f7-4054-a0c7-dc5f4c7191a8"}
	];
	
	adverts: Advert[] = 
	[
	
		{num: 1, user: "Тестовый.А", text: "Сегодня состоится хакатон 2", rating: 1, date:"01-01-2015", id:"bd076f63-1a57-4070-98f7-ccbfebdebff6"}
		
	];
	
	addAdvert(num: number, user: string, text: string, rating : number, date: string): void {
		
		this.adverts.push(new Advert(num,user,text,rating,date));
		
		let f: boolean;
		f = true;
		for(let i=0;i<this.users.length;i++){
			if(this.users[i].name==user){
				f = false;
			}
		}
		if(f) {
			this.users.push(new User(user));
		}
		
	}
	
	changeAdvert(advert: Advert): void {
		
		this.num = advert.num;
		this.user = advert.user;
        this.text = advert.text;
        this.rating = advert.rating;
        this.date = advert.date;
		this.advertChanging = advert;
		
	}
	
	deleteAdvert(): void {
		this.adverts.splice(this.adverts.indexOf(this.advertChanging),1);
	}
	
	advertFormPop(): void {
		document.getElementById('advertForm').style.display="block";
	}
	
	advertFormHide(): void {
		document.getElementById('advertForm').style.display="none";
	}
	
}