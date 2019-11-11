const senateDataPage = document.location.pathname === "/senate-data.html";
const houseDataPage = document.location.pathname === "/house-data.html";
const senateAttendancePage = document.location.pathname === "/senate-attendance.html";
const houseAttendancePage = document.location.pathname === "/house-attendance.html";
const senateLoyaltyPage = document.location.pathname === "/senate-loyalty.html";
const houseLoyaltyPage = document.location.pathname === "/house-loyalty.html";

let main = new Vue({
  el: "#main",
  data: {
    display: true,
    members: [],
    states: [],
    filteredMembers: []
  },
  created() {
    this.getData();
  },
  methods: {
    toggleUrl() {
      if (houseDataPage || houseAttendancePage || houseLoyaltyPage) {
        return "https://api.propublica.org/congress/v1/116/house/members.json";
      } else if (senateDataPage || senateAttendancePage || senateLoyaltyPage) {
        return "https://api.propublica.org/congress/v1/116/senate/members.json";
      }
    },
    async getData() {
      let url = this.toggleUrl();

      try {
        let responseObj = await fetch(url, { headers: { "X-API-Key": "ZB4bMdACwtHaGhmkzBLLOpSQaP7BNNba1wJPGEKN" } }).then(data => data.json());

        this.members = responseObj.results[0].members;
        this.filteredMembers = this.members;
        this.display = false;
        this.filterStates();
        console.log(this.members);
      } catch (err) {
        console.log(err);
      }
    },
    filter() {
      const selectDD = document.getElementById("state-select");
      const independentCB = document.getElementById("independent");
      const democratCB = document.getElementById("democrats");
      const republicanCB = document.getElementById("republicans");
      let members = this.filteredMembers;
      this.members = [];

      members.forEach(mem => {
        if (selectDD.value === mem.state || selectDD.value === 'All') {
          if (independentCB.checked && mem.party === "I") {
            this.members.push(mem);
          }
          if (democratCB.checked && mem.party === "D") {
            this.members.push(mem);
          }
          if (republicanCB.checked && mem.party === "R") {
            this.members.push(mem);
          }
        }
      })
    },
    filterStates() {
      let members = this.filteredMembers;
      this.states = [];
      members.forEach(mem => {
        if (!this.states.includes(mem.state)) {
          this.states.push(mem.state)
        }
      })
      this.states.sort();
    }
  }
});