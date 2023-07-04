<template>
<div class="home" id="all-candidates">
  <div class="center">
    <img src="../../../src/assets/images/ninja.svg" class="candidate-list">
    <h1 class="margin-tb">Candidates</h1>
  </div>
  <p v-if="userProfile.authStatus" class="cd-candidates-list-p"><router-link :to="{ name: 'create_candidate' }" class="btn btn-info" ><i class="fas fa-user-plus"></i> New Candidate</router-link></p>
  <div class="form-group">
        <input type="text" name="search" v-model="candidateSearch" placeholder="Search candidates" class="form-control" v-on:keyup="searchCandidates">
  </div>

  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Skill #1</th>
        <th>Skill #2</th>
        <th>Skill #3</th>
        <th>Ideal Company</th>
        <th>Expected Salary</th>
        <th>Status</th>
        <th v-if="userProfile.authStatus">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="candidate in candidates">
        <td>
            <a><router-link :to="{name: 'view_candidate', params: {id: candidate.id}}">{{ candidate.id }}</router-link></a>
        </td>
        <td>{{ candidate.name }}</td>
        <td>{{ candidate.topSkills.skills1 }}</td>
        <td>{{ candidate.topSkills.skills2 }}</td>
        <td>{{ candidate.topSkills.skills3 }}</td>
        <td>{{ candidate.interests.idealCompany }}</td>
        <td>{{ `RM ${candidate.interests.expectedSalary}` }}</td>
        <td>
          <i class="fas fa-eye red"></i><span class="status" v-bind:class="{ active: candidate.active, inactive: candidate.active === false }"> {{ candidate.active === true ? 'Active' : 'Inactive' }}</span>
        </td>
        <td v-if="userProfile.authStatus">
          <router-link :to="{name: 'edit_candidate', params: { id: candidate.id }}" class="btn btn-primary"><i class="fas fa-pencil-alt"></i></router-link>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import request from 'superagent'
import config from '../../../config'

const BASE_URL = process.env.NODE_ENV === 'development' ? config.dev.serviceUrl : config.build.serviceUrl

export default {
  name: 'candidates',

  data() {
    return {
      candidates: [],
      originalCandidates: [],
      candidateSearch: '',
      userProfile: {}
    }
  },
  
  created: function() {
    this.getCandidates()
    this.grabProfile()
  },

  methods: {
    grabProfile() {
      this.userProfile = this.$store.state.member
    },

    getCandidates() {
      request.get(`${BASE_URL}/api/candidates`)
      .then((res) => {
        res.header['Content-Type'] = res.header['content-type']
        if (res.statusCode === 200) {
          this.candidates = res.body.data
          this.originalCandidates = this.candidates
        }
      })
      .catch((err) => {
        console.log('err fetching candidate', err)
      })
    },
    
    searchCandidates() {
      if (this.candidateSearch == '') {
        this.candidates = this.originalCandidates
        return
      }
      
      var searchedCandidates = []

      for (let i = 0; i < this.originalCandidates.length; i++) {
        let candidateName = this.originalCandidates[i]['name'].toLowerCase()
        let skills1 = this.originalCandidates[i]['topSkills']['skills1'].toLowerCase()
        let skills2 = this.originalCandidates[i]['topSkills']['skills2'].toLowerCase()
        let skills3 = this.originalCandidates[i]['topSkills']['skills3'].toLowerCase()
        
        if (candidateName.indexOf(this.candidateSearch.toLowerCase()) >= 0 || 
        skills1.indexOf(this.candidateSearch.toLowerCase()) >= 0 || 
        skills2.indexOf(this.candidateSearch.toLowerCase()) >= 0 || 
        skills3.indexOf(this.candidateSearch.toLowerCase()) >= 0) {
          searchedCandidates.push(this.originalCandidates[i])
          }
        }
        this.candidates = searchedCandidates
    }
  }
}
 </script>

<style lang="scss" scoped>
.btn-info, .btn-primary {
  background-color: #6C55FB;
  border-color: #6C55FB;
}
</style>