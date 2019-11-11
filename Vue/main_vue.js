const main = new Vue({
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
      if (document.location.pathname === "/house-data.html") {
        return "https://api.propublica.org/congress/v1/116/house/members.json";
      } else if (document.location.pathname === "/senate-data.html") {
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

        console.log(this.filteredMembers);
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

      for (i = 0; i < members.length; i++) {
        if (selectDD.value == members[i].state || selectDD.value == 'All') {
          if (independentCB.checked == true && members[i].party == "I") {
            this.members.push(members[i]);
          }
          if (democratCB.checked == true && members[i].party == "D") {
            this.members.push(members[i]);
          }
          if (republicanCB.checked == true && members[i].party == "R") {
            this.members.push(members[i]);

          }
        }
      }
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