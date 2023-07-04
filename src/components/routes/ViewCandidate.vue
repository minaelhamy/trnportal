<template>
  <div class="home">
    <notification v-bind:notifications="notifications"></notification>
    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'all_candidates' }" class="btn btn-primary"><i class="fas fa-arrow-circle-left"></i> Return to candidates</router-link>
        <div class="separator-10"></div>
      </div>
      <div class="col right">
      </div>
    </div>
    <div class="card" id="candidate">
      <div class="card-header">
        <span style="float:right;" v-if="authenticated">
          <toggle-button :value="isActive" 
            :labels="{ checked: 'Active', unchecked: 'Inactive' }"
            :width="100"
            :sync="true"
            :speed="800"
            :color="{ checked: '#28a745', unchecked: '#e21b22' }"
            :disabled="isDisabled"
            v-on:change="changeHandler"
            id="changed-font"/>
        </span>
        <div class="row">
          <div class="col-2 margin-tb">
           <img class="profile-pic" src="../../../src/assets/images/profile.svg">
          </div>
          <div class="col-10 margin-tb">
            <h3 class="profile-name">{{ candidate.name }}</h3>
            <span class="profile"><i class="fas fa-at trn-color"></i> {{ candidate.email }}</span>
            <span class="profile"><i class="fas fa-phone-square trn-color"></i> {{ candidate.mobileNo }}</span>
            <i class="fas fa-eye trn-color"></i><span class="status" v-bind:class="{ active: isActive, inactive: isActive === false }"> {{ candidate.active === true ? 'Active' : 'Inactive' }}</span><span class="space">&bull;</span>
            <span class="last-updated"><i class="fas fa-user-plus trn-color"></i> Submitted by: <b>{{ candidate.memberSubmitted }}</b></span><span class="space">&bull;</span>
            <span class="last-updated"><i class="fas fa-pencil-alt trn-color"></i> Last updated: <timeago :since="candidate.updatedDateMs" :auto-update="60"></timeago> by <b>{{ candidate.memberUpdated }}</b></span>

            <div class="margin-tb" v-if="authenticated">
              <router-link :to="{name: 'edit_candidate', params: { id: candidate.id }}" class="btn btn-primary"><i class="fas fa-pencil-alt"></i></router-link>

              <!-- Button trigger modal -->
              <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" @click="showModal = true"><i class="fas fa-plus"></i> Insert note</button>

              <!-- Modal -->
              <div @close="showModal = false" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{{`Insert Note for ${candidate.name}`}}</h5>
                      <a class="close pointer" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </a>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <label for="exampleFormControlSelect1" class="candidate-tips">Tips: Candidate wants a salary raise</label>
                        <input type="hidden" value="hidden"> 
                        <textarea class="form-control" v-model="comment.note" rows="6" placeholder="Candidate is available for an interview in x amount of days" required></textarea>
                      </div>
                      <div class="modal-footer">
                        <button class="btn btn-primary pointer" @click="insertNote" v-bind:disabled="isDisabled">Submit</button>
                        <notification v-bind:notifications="notifications"></notification>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row profile-grid">
        <div class="col-sm-6 margin-b">
          <div class="card">
            <h5 class="card-header"><i class="fas fa-info trn-color"></i> Other Information</h5>
            <div class="card-body">
              <h5 class="card-title">Company name:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateInformation.companyName }}</p>
              <h5 class="card-title">Role in the company:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateInformation.roleCompany }}</p>
              <h5 class="card-title">Role in the project:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateInformation.roleProject }}</p>
              <h5 class="card-title">Recent project that he/she is proud of:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateInformation.projectProud }}</p>
              <h5 class="card-title">Recent project:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateInformation.recentProject }}</p>
              <h5 class="card-title">Technologies used in the project:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateInformation.technologiesProject }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 margin-b">
          <div class="card">
            <h5 class="card-header"><i class="fas fa-users trn-color"></i> Candidate's Team</h5>
            <div class="card-body">
              <h5 class="card-title">Team size:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateTeam.teamSize }}</p>
              <h5 class="card-title">Reports to:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateTeam.reportingTo }}</p>
              <h5 class="card-title">Skillset in the team:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.candidateTeam.skillsetTeam }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 margin-b">
          <div class="card">
            <h5 class="card-header"><i class="fas fa-trophy trn-color"></i> Biggest Achievements</h5>
            <div class="card-body">
              <h5 class="card-title">How did you achieve it?</h5>
              <p class="card-text trn-text sz-1">{{ candidate.biggestAchievement.achievementHow }}</p>
              <h5 class="card-title">What did you achieve?</h5>
              <p class="card-text trn-text sz-1">{{ candidate.biggestAchievement.achievementWhat }}</p>
              <h5 class="card-title">Outcome of achieving it?</h5>
              <p class="card-text trn-text sz-1">{{ candidate.biggestAchievement.achievementResult }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6 margin-b">
          <div class="card">
            <h5 class="card-header"><i class="fas fa-heart trn-color"></i> Interests</h5>
            <div class="card-body">
              <h5 class="card-title"><i class="fas fa-battery-three-quarters"></i> Opportunity keenness:</h5>
              <div class="progress" style="height: 25px;">
                <div class="progress-bar sz-1" role="progressbar" v-bind:style="{ 'width': candidate.interests.percentageKeen + '%' }" v-bind:aria-valuenow="candidate.interests.percentageKeen" aria-valuemin="0" aria-valuemax="100">{{`${candidate.interests.percentageKeen}%`}}</div>
              </div>
              <h5 class="card-title"><i class="fas fa-question"></i> Reason for looking out:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.interests.opportunityReason }}</p>
              <h5 class="card-title"><i class="fas fa-user-circle"></i> The ideal role:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.interests.idealRole }}</p>
              <h5 class="card-title"><i class="fas fa-building"></i> The ideal company:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.interests.idealCompany }}</p>
              <h5 class="card-title"><i class="fas fa-industry"></i> The ideal industry to work in:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.interests.idealIndustry }}</p>
              <h5 class="card-title"><i class="fas fa-compass"></i> The ideal location:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.interests.idealLocation }}</p>
              <h5 class="card-title"><i class="fas fa-credit-card"></i> Current salary: <span class="trn-text">RM {{ candidate.interests.currentSalary.toLocaleString() }}</span></h5>
              <h5 class="card-title"><i class="fas fa-credit-card"></i> Allowances: <span class="trn-text">RM {{ candidate.interests.allowances.toLocaleString() }}</span></h5>
              <h5 class="card-title"><i class="fas fa-credit-card"></i> Expected salary: <span class="trn-text">RM {{ candidate.interests.expectedSalary.toLocaleString() }}</span></h5>
              <h5 class="card-title"><i class="fas fa-calendar"></i> Notice period:</h5>
              <p class="card-text trn-text sz-1">{{ candidate.interests.noticePeriod }}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div class="card" id="skills">
      <h4 class="card-header"><i class="fas fa-bolt trn-color"></i> Top Skills</h4>
      <div class="card-body">
        <div class="row">
          <div class="col-sm">
            <div class="card">
              <div class="card-body center profile-skills-container">
                <h5 class="card-title">{{ candidate.topSkills.skills1 }}</h5>
                <p class="card-text">{{ candidate.topSkills.skills1Why }}</p>
                <a v-bind:href="candidate.topSkills.skills1Google" class="btn btn-primary" target="_blank" rel="noopener noreferrer"><i class="fab fa-google"></i> Google {{candidate.topSkills.skills1}}</a>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div class="card">
              <div class="card-body center profile-skills-container">
                <h5 class="card-title">{{ candidate.topSkills.skills2 }}</h5>
                <p class="card-text">{{ candidate.topSkills.skills2Why }}</p>
                <a v-bind:href="candidate.topSkills.skills2Google" class="btn btn-primary" target="_blank" rel="noopener noreferrer"><i class="fab fa-google"></i> Google {{candidate.topSkills.skills2}}</a>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div class="card">
              <div class="card-body center profile-skills-container">
                <h5 class="card-title">{{ candidate.topSkills.skills3 }}</h5>
                <p class="card-text">{{ candidate.topSkills.skills3Why }}</p>
                <a v-bind:href="candidate.topSkills.skills3Google" class="btn btn-primary" target="_blank" rel="noopener noreferrer"><i class="fab fa-google"></i> Google {{candidate.topSkills.skills3}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div class="card" id="attachments">
      <h4 class="card-header"><i class="fas fa-paperclip trn-color"></i> Attachments</h4>
      <div class="card-body">
        <ul class="attachments" v-if="!attachmentsEmpty">
          <li v-for="attachment in attachments">
            <a v-bind:href="downloadAttachment(attachment)" class="btn btn-primary" download><i class="fas fa-download"></i> {{ attachment }}</a>
          </li>
        </ul>
        <h4 class="form-header">Upload New Attachments</h4>
        <div v-if="isDemoUser">
          <span class="demo-restrictions">Sorry this feature is unavailable for the demo. <i class="fas fa-exclamation-circle text-danger"></i></span>
        </div>
        <div v-else>
          <form v-on:submit.prevent="uploadNewAttachments">
            <fieldset v-bind:disabled="condition">
              <div class="form-group">
                <label for="exampleFormControlInput1">Files</label>
                <input type="file" ref="files" class="form-control" multiple v-on:change="handleFilesUpload()" required>
              </div>
              <div class="form-group">
                <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove <i class="fa fa-times" aria-hidden="true"></i></span></div>
              </div>
              <div class="form-group">
                <button class="btn btn-success" v-on:click="addFiles()" v-bind:disabled="condition"><i class="fas fa-plus"></i> Add Files</button>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" v-bind:disabled="condition"><i class="fas fa-upload"></i> Upload</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    <div class="separator"></div>
    <div class="card" id="notes">
      <h4 class="card-header"><i class="far fa-sticky-note trn-color"></i> Candidate Notes</h4>
      <div class="card-body">
        <div class="list-group">
          <div class="list-group-item list-group-item-action flex-column align-items-start notes" v-for="note in notes">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">#{{ note.id }}</h5>
              <small><timeago :since="note.createdDateMs" :auto-update="60"></timeago></small>
            </div>
            <p class="mb-1">{{ note.notes }}</p>
            <small><b>Posted by {{ note.memberUpdated }}</b></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Notification from '../Notifications.vue'
  import request from 'superagent'
  import { isEmpty } from '../../lib/utils'
  import config from '../../../config'

  const BASE_URL = process.env.NODE_ENV === 'development' ? config.dev.serviceUrl : config.build.serviceUrl
  
  export default {
    data() {
      return {
        candidate: [],
        notes: [],
        showModal: false,
        comment: {},
        attachments: [],
        authenticated: false,
        notifications: [],
        files: [],
        isActive: false,
        isDisabled: false,
        isDemoUser: false,
        attachmentsEmpty: false
        }
      },
      
      created: function() {
        this.fetchCandidate()
        this.grabProfile()
      },
      
      methods: {
        changeHandler(event) {
          request.post(`${BASE_URL}/api/candidate/${this.$route.params.id}/status/update`)
            .send({ status: event.value })
            .send({ member: this.$store.state.member.userProfile.username })
            .then((res) => {
              if (res.statusText === 'OK' || res.statusCode === 200) {
                this.notifications.push({
                  type: 'success',
                  message: 'Candidate status updated successfully'
                })
                this.isDisabled = true
              }
            })
            .catch((err) => {
              console.log('err patching candidate', err)
            })
        },

        grabProfile() {
          let profile = localStorage.getItem('profile')

          if (profile) { // User is still logged in, time to reinstate a store state
            this.$store.dispatch('STORE_AUTHENTICATED', JSON.parse(profile))
          } 
          this.authenticated = this.$store.state.member.authStatus

          // To block off demo users submitting illicit content
          if (this.$store.state.member.userProfile.username == 'demouser') {
            this.isDemoUser = true
          }
        },

        addFiles() {
          this.$refs.files.click()
        },

        uploadNewAttachments() {
          let req = request.post(`${BASE_URL}/api/candidate/files/upload/${this.$route.params.id}`)
          req.field('attachments[]', this.attachments)
          req.field({ member: this.$store.state.member.userProfile.username })

          this.files.map((file) => {
            req.attach(file.name, file)
          })
          req.end((err, res) => {
            if (err) {
              console.log('Error uploading attachments: ', err)
              this.notifications.push({
                type: 'error',
                message: `Error caught: ${err}`
              })
              return false
            }

            if (res.statusText === 'OK' || res.statusCode === 200) {
              this.notifications.push({
                type: 'success',
                message: 'Attachments uploaded successfully'
              })
            }
          })
        },

        /*
          Handles the uploading of files
        */
        handleFilesUpload(){
          let uploadedFiles = this.$refs.files.files;

          /*
            Adds the uploaded file to the files array
          */
          for( var i = 0; i < uploadedFiles.length; i++ ){
            this.files.push( uploadedFiles[i] );
          }
        },

        /*
          Removes a select file the user has uploaded
        */
        removeFile( key ){
          this.files.splice( key, 1 );
        },

        fetchCandidate() {
          request.get(`${BASE_URL}/api/candidate/${this.$route.params.id}`)
            .then((res) => {
              if (res.statusText === 'OK' || res.statusCode === 200) {
                this.candidate = res.body
                this.notes = res.body.notes
                this.attachments = res.body.attachments
                this.isActive = res.body.active
                this.attachmentsEmpty = this.attachments === 'undefined' || this.attachments.length <= 0 ? true : false
              }
            })
            .catch((err) => {
              console.log('err fetching candidate', err)
            })
        },

        notificationTest() {
          this.notifications.push({
            type: 'success',
            message: 'Product created successfully'
          })
        },

        downloadAttachment(file) {
          return `${BASE_URL}/download/${file}`
        },

        insertNote() {
          if (isEmpty(this.comment)) {
            this.notifications.push({
              type: 'danger',
              message: 'Oops, you forgot to add a note'
            })
            return
          }
          request.post(`${BASE_URL}/api/candidate/notes/add/${this.$route.params.id}`)
            .send(this.comment)
            .send({ member: this.$store.state.member.userProfile.username })
            .then((res) => {
              if (res.statusText === 'OK' || res.statusCode === 200) {
                this.notifications.push({
                  type: 'success',
                  message: 'Notes successfully added. You may close this window.'
                })
                this.$emit('close')
                this.isDisabled = true
              }
            })
            .catch((err) => {
              console.log('err patching candidate', err)
            })
          }
        },
        
        components: {
            'notification' : Notification
        },
        props: ['show']
    }
</script>

<style lang="scss" scoped>

.btn-primary {
  background-color: #5E60F4;
  border-color: #5E60F4;

  &:hover {
    background-color: #6a78f2;
    border-color: #6a78f2;
  }
}

.btn-info {
  background-color: #6C55FB;
  border-color: #6C55FB;
}

.modal-footer {
  padding-bottom: 200px;
}

input[type="file"] {
  position: absolute;
  top: -500px;
  visibility: hidden;
}

.file-listing {
  border-radius: 5px;
  padding: 10px 15px;
  margin: 10px 0;
  background: rgba(226, 27, 34, 0.3);
}

.remove-file {
  color: red;
  cursor: pointer;
  float: right;

  &:hover {
    color: #000;
  }
}

.vue-js-switch {

  &#changed-font {
    line-height: 1.5;
    font-size: 16px;
  }
}

.progress-bar {
  background-color: #6C55FB;
}

.card {
  height: 100%;
  min-height: 204px;
}

</style>