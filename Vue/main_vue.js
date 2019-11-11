const main = new Vue({
  el: "#main",
  data: {
    display: true,
    houseMembers: [],
    senateMembers: [],
    states: [],
    filteredMembers: []
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const senateURL = `https://api.propublica.org/congress/v1/116/senate/members.json`;
      const houseURL = `https://api.propublica.org/congress/v1/116/house/members.json`;
      try {
        let responseObj = await Promise.all([
          fetch(senateURL, { headers: { "X-API-Key": "ZB4bMdACwtHaGhmkzBLLOpSQaP7BNNba1wJPGEKN" } }).then(data => data.json()),
          fetch(houseURL, { headers: { "X-API-Key": "ZB4bMdACwtHaGhmkzBLLOpSQaP7BNNba1wJPGEKN" } }).then(data => data.json())
        ]);
        this.houseMembers = responseObj[1].results[0].members;
        this.senateMembers = responseObj[0].results[0].members;
        this.filteredMembers = this.houseMembers;
        main.filterStates();
        this.display = false;
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
      let members = main.filteredMembers;
      main.houseMembers = [];

      for (i = 0; i < members.length; i++) {
        if (selectDD.value == members[i].state || selectDD.value == 'All') {
          if (independentCB.checked == true && members[i].party == "I") {
            main.houseMembers.push(members[i]);
          }
          if (democratCB.checked == true && members[i].party == "D") {
            main.houseMembers.push(members[i]);
          }
          if (republicanCB.checked == true && members[i].party == "R") {
            main.houseMembers.push(members[i]);

          }
        }
      }
    },
    filterStates() {
      let members = this.filteredMembers;
      this.states = [];
      members.forEach(mem => {
        if (!this.states.includes(mem.state)) {
          main.states.push(mem.state)
        }
      })
      main.states.sort();
    }
  }
});