<template>
<div class="home" id="update-candidate">
  <div class="row">
    <div class="col-2">
      <div class="position-fixed pads">
        <img class="edit-profile-pic" src="../../../src/assets/images/profile-edit.svg">
        <h4>{{ candidate.name }}</h4>
        <p class="w-140"><i class="fas fa-phone-square"></i> {{ candidate.mobileNo }}</p>
        <p class="w-140"><i class="fas fa-at"></i><br>{{ candidate.email }}</p>
        <p class="w-140"><b>Skills:</b><br>
          <i class="fas fa-bolt"></i> {{ typeof candidate.topSkills.skills1 === 'object' ? candidate.topSkills.skills1.label : candidate.topSkills.skills1  }}<br>
          <i class="fas fa-bolt"></i> {{ typeof candidate.topSkills.skills2 === 'object' ? candidate.topSkills.skills2.label : candidate.topSkills.skills2 }}<br>
          <i class="fas fa-bolt"></i> {{ typeof candidate.topSkills.skills3 === 'object' ? candidate.topSkills.skills3.label : candidate.topSkills.skills3 }}
        </p>
        <p class="w-140"><i class="fas fa-credit-card"></i> <b>Curr Salary:</b><br>RM{{ candidate.interests.currentSalary }}</p>
        <p class="w-140"><i class="fas fa-credit-card"></i> <b>Exp Salary:</b><br>RM{{ candidate.interests.expectedSalary }}</p>
        <p class="w-140"><b><i class="fas fa-user-plus"></i> Submitted by:</b> <br>{{ candidate.memberSubmitted }}</p>
        <p class="w-140"><b><i class="fas fa-pencil-alt"></i> Last updated by:</b> <br>{{ candidate.memberUpdated }}</p>
        <router-link :to="{ name: 'all_candidates' }" class="btn btn-primary"><i class="fas fa-arrow-circle-left"></i> Return</router-link>
      </div>
    </div>
    <div class="col-8">
      <h1>Update Candidate <b>{{ candidate.name }}</b></h1>
        <notification v-bind:notifications="notifications"></notification>
        <form v-on:submit.prevent="editCandidate">
          <div class="form-group">
            <label name="candidate_id">ID</label>
            <input type="text" class="form-control" disabled v-model="candidate.id" id="candidate_id">
          </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="exampleFormControlInput1">Full Name</label>
                <input type="text" class="form-control" v-model="candidate.name" placeholder="Jane Smith" required>
              </div>
              <div class="form-group col-md-6">
                <label for="exampleFormControlInput1">Mobile No</label>
                <input type="tel" class="form-control" v-model="candidate.mobileNo" placeholder="017323732" required>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Email address</label>
              <input type="email" class="form-control" v-model="candidate.email" placeholder="name@example.com" required>
            </div>
            <a class="anchor" id="candidate-information"></a>
            <h2 class="form-header">Candidate's Information</h2>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="exampleFormControlInput1">Company Name</label>
                <input type="text" class="form-control" v-model="candidate.candidateInformation.companyName" placeholder="Facebook" required>
              </div>
              <div class="form-group col-md-6">
                <label for="exampleFormControlInput1">Role in the company</label>
                <input type="text" class="form-control" v-model="candidate.candidateInformation.roleCompany" placeholder="Software Engineer" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="exampleFormControlInput1">Recent Project/Application involved in</label>
                <textarea class="form-control" v-model="candidate.candidateInformation.recentProject" required rows="3" placeholder="I developed Facebook"></textarea>
              </div>
              <div class="form-group col-md-6">
                <label for="exampleFormControlInput1">Role in the project</label>
                <input type="text" class="form-control" v-model="candidate.candidateInformation.roleProject" placeholder="Software Engineer" required>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Technologies used in the project</label>
              <input type="text" class="form-control" v-model="candidate.candidateInformation.technologiesProject" placeholder="React.js, Node.js, PHP" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Projects candidate involved in detail that he/she is proud of</label>
              <textarea class="form-control" required v-model="candidate.candidateInformation.projectProud" rows="3" placeholder="I built Artifical Intelligence"></textarea>
            </div>
            <a class="anchor" id="candidate-team"></a>
            <h2 class="form-header">Candidate's Team</h2>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Team size</label>
              <input type="text" class="form-control" v-model="candidate.candidateTeam.teamSize" placeholder="5-10" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Skillsets within the team</label>
              <input type="text" class="form-control" v-model="candidate.candidateTeam.skillsetTeam" placeholder="React.js, Node.js, PHP" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Reporting to</label>
              <input type="text" class="form-control" v-model="candidate.candidateTeam.reportingTo" placeholder="Manager" required>
            </div>
            <a class="anchor" id="biggest-achievement"></a>
            <h2 class="form-header">Biggest Achievement</h2>
            <div class="form-group">
              <label for="exampleFormControlInput1">What?</label>
              <input type="text" class="form-control" v-model="candidate.biggestAchievement.achievementWhat" placeholder="I became a team lead" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">How?</label>
              <input type="text" class="form-control" v-model="candidate.biggestAchievement.achievementHow" placeholder="By setting a great example in the team for over 4 consecutive years" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Result?</label>
              <input type="text" class="form-control" v-model="candidate.biggestAchievement.achievementResult" placeholder="I revamped the way team leads lead a team" required>
            </div>
            <a class="anchor" id="top-skills"></a>
            <h2 class="form-header">Top Skills</h2>
            <div class="form-row">
              <div class="form-group col-md-7">
                <label for="exampleFormControlInput1">First skill</label>
                <v-select v-model="candidate.topSkills.skills1" :options="skills"></v-select>
              </div>
              <div class="form-group col-md-5">
                <label for="exampleFormControlInput1">Why?</label>
                <input type="text" class="form-control" v-model="candidate.topSkills.skills1Why" placeholder="Because it's scalable" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-7">
                <label for="exampleFormControlInput1">Second skill</label>
                <v-select v-model="candidate.topSkills.skills2" :options="skills"></v-select>
              </div>
              <div class="form-group col-md-5">
                <label for="exampleFormControlInput1">Why?</label>
                <input type="text" class="form-control" v-model="candidate.topSkills.skills2Why" placeholder="Leading cloud infrastructure" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-7">
                <label for="exampleFormControlInput1">Third skill</label>
                <v-select v-model="candidate.topSkills.skills3" :options="skills"></v-select>
              </div>
              <div class="form-group col-md-5">
                <label for="exampleFormControlInput1">Why?</label>
                <input type="text" class="form-control" v-model="candidate.topSkills.skills3Why" placeholder="Best way to create back-end services" required>
              </div>
            </div>
            <a class="anchor" id="interests"></a>
            <h2 class="form-header">Interests</h2>
            <div class="form-group">
              <label for="exampleFormControlInput1">Keen on new opportunity (On a scale of 1 - 10)</label>
              <input type="text" class="form-control" v-model="candidate.interests.opportunityKeenness" placeholder="1 to 10" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Reason for looking out</label>
              <input type="text" class="form-control" v-model="candidate.interests.opportunityReason" placeholder="Exploring new skills" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Ideal role</label>
              <input type="text" class="form-control" v-model="candidate.interests.idealRole" placeholder="PHP Developer" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Company</label>
              <input type="text" class="form-control" v-model="candidate.interests.idealCompany" placeholder="Google" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Industry</label>
              <input type="text" class="form-control" v-model="candidate.interests.idealIndustry" placeholder="Oil &amp; Gas" required>
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Location</label>
              <input type="text" class="form-control" v-model="candidate.interests.idealLocation" placeholder="Cyberjaya" required>
            </div>
            <label for="basic-url">Current Salary</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">RM</span>
              </div>
              <input type="number" v-model="candidate.interests.currentSalary" class="form-control" aria-label="Amount (to the nearest Ringgit)" required>
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
              </div>
            </div>
            <br>
            <label for="basic-url">Allowances (Medical, Bonus, Fixed etc)</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">RM</span>
              </div>
              <input type="number" v-model="candidate.interests.allowances" class="form-control" aria-label="Amount (to the nearest Ringgit)" required>
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
              </div>
            </div>
            <br>
            <label for="basic-url">Expected Salary</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">RM</span>
              </div>
              <input type="number" v-model="candidate.interests.expectedSalary" class="form-control" aria-label="Amount (to the nearest Ringgit)" required>
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
              </div>
              <input type="hidden" v-model="candidate.createdDate" name="hiddenval" value="createdDate">
              <input type="hidden" v-model="candidate.attachments" name="hiddenval" value="attachments">
            </div>
            <div class="form-group">
              <br>
              <label for="exampleFormControlInput1">Notice Period</label>
              <input type="text" class="form-control" v-model="candidate.interests.noticePeriod" placeholder="1 month" required>
            </div>
            <div class="form-group">
                <button class="btn btn-primary"><i class="fas fa-save"></i> Save</button>
            </div>
        </form>
        <form v-on:submit.prevent="insertNote">
          <a class="anchor" id="notes"></a>
          <h2 class="form-header">Candidate Notes</h2>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Tips: Candidate wants a salary raise</label>
            <textarea class="form-control" required v-model="notes.note" rows="6" placeholder="Candidate is available for an interview in x amount of days"></textarea>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" v-bind:disabled="isDisabled"><i class="fas fa-plus"></i> Insert Note</button>
          </div>
        </form>
    </div>
    <div class="col-2">
      <div class="position-fixed">
        <ul class="list-group">
          <li class="list-group-item"><a href="#candidate-information"><i class="fas fa-info"></i> Candidate Information</a></li>
          <li class="list-group-item"><a href="#candidate-team"><i class="fas fa-users"></i> Candidate Team</a></li>
          <li class="list-group-item"><a href="#biggest-achievement"><i class="fas fa-trophy"></i> Biggest Achievement</a></li>
          <li class="list-group-item"><a href="#top-skills"><i class="fas fa-bolt"></i> Top Skills</a></li>
          <li class="list-group-item"><a href="#interests"><i class="fas fa-heart"></i> Interests</a></li>
          <li class="list-group-item"><a href="#attachments"><i class="fas fa-paperclip"></i> Attachments</a></li>
          <li class="list-group-item"><a href="#notes"><i class="far fa-sticky-note"></i> Candidate Notes</a></li>
        </ul>
      </div>
    </div>
  </div>        
</div>
</template>

<script>
  import Notification from '../Notifications.vue'
  import request from 'superagent'
  import config from '../../../config'
  import { isEmpty } from '../../lib/utils'

  const BASE_URL = process.env.NODE_ENV === 'development' ? config.dev.serviceUrl : config.build.serviceUrl

  export default {
    data() {
      return {
        candidate: {},
        notes: {},
        notifications: [],
        skills: [],
        isDisabled: false
      }
    },
    
    created: function() {
      this.getCandidate()
      this.loadSkills()
    },
    
    methods: {
      getCandidate: function() {
        request.get(`${BASE_URL}/api/candidate/${this.$route.params.id}`)
          .then((res) => {
            if (res.statusText === 'OK' || res.statusCode === 200) {
              this.candidate = res.body
            }
          })
          .catch((err) => {
            console.log('err fetching candidate', err)
          })
        },

        loadSkills() {
          request.get(`${BASE_URL}/api/skills/list`)
          .then((res) => {
            this.skills = res.body
          })
          .catch((err) => {
            console.log('Error fetching skills', err)
          })
        },

        notificationTest: function() {
            this.notifications.push({
              type: 'success',
              message: 'Candidate updated successfully'
            })
        },

        editCandidate: function() {
          // Validation
          const expectedSalary = parseInt(this.candidate.interests.expectedSalary)
          if (isNaN(expectedSalary)) {
            this.notifications.push({
              type: 'danger',
              message: 'Salary must be a number'
            })
              return false
          }


          typeof this.candidate.topSkills.skills1 === 'object' ? this.candidate.topSkills.skills1 = this.candidate.topSkills.skills1.label : this.candidate.topSkills.skills1
          typeof this.candidate.topSkills.skills2 === 'object' ? this.candidate.topSkills.skills2 = this.candidate.topSkills.skills2.label : this.candidate.topSkills.skills2
          typeof this.candidate.topSkills.skills3 === 'object' ? this.candidate.topSkills.skills3 = this.candidate.topSkills.skills3.label : this.candidate.topSkills.skills3

          request.patch(`${BASE_URL}/api/candidate/edit/${this.$route.params.id}`)
            .send(this.candidate)
            .send({ member: this.$store.state.member.userProfile.username })
            .then((res) => {
              if (res.statusText === 'OK' || res.statusCode === 200) {
                this.notifications.push({
                  type: 'success',
                  message: 'Candidate updated successfully'
                })
              }
            })
            .catch((err) => {
              console.log('err patching candidate', err)
            })
        },

        insertNote: function() {
          if (isEmpty(this.notes)) {
            this.notifications.push({
              type: 'danger',
              message: 'Oops, you forgot to add a note'
            })
            return
          }
          request.post(`${BASE_URL}/api/candidate/notes/add/${this.$route.params.id}`)
            .send(this.notes)
            .send({ member: this.$store.state.member.userProfile.username })
            .then((res) => {
              if (res.statusText === 'OK' || res.statusCode === 200) {
                this.notifications.push({
                  type: 'success',
                  message: 'Notes successfully added'
                })
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
      }
    }
</script>

<style lang="scss" scoped>
.btn-primary {
  background-color: #6C55FB;
  border-color: #6C55FB;
}
</style>
