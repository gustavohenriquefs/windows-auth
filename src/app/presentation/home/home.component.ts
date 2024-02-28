import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFileAlt, faListAlt } from '@fortawesome/free-regular-svg-icons';

interface TabItem {
  name: string;
  icon: IconDefinition;
}

interface DataHomeTab {
  selectedTab: string;
  tabItems: TabItem[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dataHomeTabs: DataHomeTab = {
    selectedTab: 'View',
    tabItems: [
      {
        name: 'View',
        icon: faListAlt
      },
      {
        name: 'Edit',
        icon: faFileAlt
      }
    ]};

  selectTab(tabName: string): void {
    this.dataHomeTabs.selectedTab = tabName;
  }
}
