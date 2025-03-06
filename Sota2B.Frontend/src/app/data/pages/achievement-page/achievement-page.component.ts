import { Component } from '@angular/core';
import { UserService } from '../../../services/user-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Achievement } from '../../interfaces/achievement';
import { AchievementCardComponent } from "../../components/cards/achievement-card/achievement-card.component";
import { achievementService as AchievementService } from '../../../services/achievment-service.service';

@Component({
  selector: 'app-Achievement-page',
  imports: [AchievementCardComponent, CommonModule],
  templateUrl: './achievement-page.component.html',
  styleUrl: './achievement-page.component.less'
})
export class AchievementPageComponent {
  achievements: Achievement[] = [];
  idUser!: number;
  private sub: Subscription | null = null;
  constructor(
    private achievementService: AchievementService,
    private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idUser = params['idUser'];
    })
    this.sub = this.achievementService.getAchievements().subscribe({
      next: (value) => {
        this.achievements = value;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
