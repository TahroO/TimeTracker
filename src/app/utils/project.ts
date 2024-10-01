export class Project {

  projectName: string;
  projectTime: number;

  constructor(name: string, time: number) {
    this.projectName = name;
    this.projectTime = time;
  }

  getProjectTime() {
    return this.projectTime;
  }

  getProjectName() {
    return this.projectName;
  }

  setProjectTime(time: number) {
    this.projectTime = time;
  }

  setProjectName(name: string) {
    this.projectName = name;
  }

}
