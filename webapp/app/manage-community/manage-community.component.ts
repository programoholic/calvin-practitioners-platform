import { Component, OnInit, Input } from '@angular/core';
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import { Http, Response } from '@angular/http';

import { CommunityProfileService } from '../community-profile/community-profile.service';

import { CommunityProfileComponent } from '../community-profile/community-profile.component';

import { updateSpecificCommunityService } from '../manage-community/manage-community.service';


@Component({
  selector: 'calvin-manage-community',
  templateUrl: './manage-community.component.html',
  styleUrls: ['./manage-community.component.css'],
  providers: [CommunityProfileService, updateSpecificCommunityService],
  
})
export class ManageCommunityComponent implements OnInit {


    userForm: FormGroup;

contents = [];
selectedValue: string;
public tagarray= [];
url: string;
param = [];
domain;
// myAvatar;
updatedBy;
status;
isCounter = true;
ans;
tagname:String;
  
   constructor(private route: ActivatedRoute, private router: Router,
   private commProfileService: CommunityProfileService, private commUpdateService: updateSpecificCommunityService) { }

   chipValue(tag) {

  //  alert("getting called chip");
   this.tagarray.push(tag);
  //  this.tagname = '';


   
 } 
  // deselect chip value/remove tag value from an array
  clearTag(tag) {
  const tagvalue = tag;
  this.tagarray = this.tagarray.filter(item => item !== tagvalue);
  
 }



 onSubmit(Form: any,): void {  
    Form.updatedby = this.updatedBy;
    Form.status = this.status;
    Form.tags = this.tagarray;
    console.log('form value',Form);
    this.commUpdateService.updateSpecificCommunity(Form,this.domain).subscribe(
    (data) => console.log('posted data',Form, this.domain),
    () => console.log('finished'))
}
 
 


 ngOnInit() {
   
   
   this.commProfileService.getCommunity(this.route.snapshot.params['domain']). subscribe ( res => {  this.contents = res; 
   this.domain = res.domain;
  //  this.myAvatar = res.avatar;
   this.updatedBy = res.updatedby;
   this.status = res.status;
  //  this.tagarray.push(res.tags);
  } );

}
}

