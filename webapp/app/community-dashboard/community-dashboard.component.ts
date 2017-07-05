import { Component, OnInit } from '@angular/core';
import { CommunityToolsWidgetComponent } from '../community-tools-widget/community-tools-widget.component';
import { CommunityMembersWidgetComponent } from '../community-members-widget/community-members-widget.component';
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { CommunityProfileService } from '../community-profile/community-profile.service';
import { ManageCommunityComponent } from '../manage-community/manage-community.component';
import { CommunityProfileComponent } from '../community-profile/community-profile.component';



@Component({
  selector: 'calvin-community-dashboard',
  templateUrl: './community-dashboard.component.html',
  styleUrls: ['./community-dashboard.component.css'],
  providers: [CommunityProfileService],
})
export class CommunityDashboardComponent implements OnInit {
  url: string;
  param = [];
  ans;
  contents = [];
  isCounter = true;
 
  
  constructor(private commProfileService: CommunityProfileService,private router: Router,private route: ActivatedRoute,) {
  }
  ngOnInit() {
     this.commProfileService.getCommunity(this.route.snapshot.params['domain']). subscribe ( res => { this.contents = res; 
     console.log(this.contents)
  } );
  }
}

