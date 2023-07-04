<template>
<div class="home container" id="create-candidate">
    <div v-if="!condition" class="row">
      <div class="col-1 pads"></div>
      <div class="col-9">
        <h1>Create Candidate Profile</h1>
        <router-link :to="{ name: 'all_candidates' }" class="btn btn-primary margin-tb"><i class="fas fa-arrow-circle-left"></i> Return to candidates</router-link><br><br>
        <notification v-bind:notifications="notifications"></notification>
        <form v-on:submit.prevent="addCandidate">
          <fieldset v-bind:disabled="condition">
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
            <input type="text" class="form-control" v-model="candidate.companyName" placeholder="Facebook" required>
          </div>
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Role in the company</label>
            <input type="text" class="form-control" v-model="candidate.roleCompany" placeholder="Software Engineer" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Recent Project/Application involved in</label>
            <textarea class="form-control" v-model="candidate.recentProject" required rows="3" placeholder="I developed Facebook"></textarea>
          </div>
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Role in the project</label>
            <input type="text" class="form-control" v-model="candidate.roleProject" placeholder="Software Engineer" required>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Technologies used in the project</label>
          <input type="text" class="form-control" v-model="candidate.technologiesProject" placeholder="React.js, Node.js, PHP" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Projects candidate involved in detail that he/she is proud of</label>
          <textarea class="form-control" required v-model="candidate.projectProud" rows="3" placeholder="I built Artifical Intelligence"></textarea>
        </div>
        <a class="anchor" id="candidate-team"></a>
        <h2 class="form-header">Candidate's Team</h2>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Team size</label>
          <input type="number" class="form-control" v-model="candidate.teamSize" placeholder="200" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Skillsets within the team</label>
          <input type="text" class="form-control" v-model="candidate.skillsetTeam" placeholder="React.js, Node.js, PHP" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Reporting to</label>
          <input type="text" class="form-control" v-model="candidate.reportingTo" placeholder="Manager" required>
        </div>
        <a class="anchor" id="biggest-achievement"></a>
        <h2 class="form-header">Biggest Achievement</h2>
        <div class="form-group">
          <label for="exampleFormControlInput1">What?</label>
          <input type="text" class="form-control" v-model="candidate.achievementWhat" placeholder="I became a team lead" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">How?</label>
          <input type="text" class="form-control" v-model="candidate.achievementHow" placeholder="By setting a great example in the team for over 4 consecutive years" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Result?</label>
          <input type="text" class="form-control" v-model="candidate.achievementResult" placeholder="I revamped the way team leads lead a team" required>
        </div>
        <a class="anchor" id="top-skills"></a>
        <h2 class="form-header">Top Skills</h2>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">First skill</label>
            <v-select v-model="candidate.skills1" :options="skills"></v-select>
          </div>
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Why?</label>
            <input type="text" class="form-control" v-model="candidate.skills1Why" placeholder="Because it's scalable" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Second skill</label>
            <v-select v-model="candidate.skills2" :options="skills"></v-select>
          </div>
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Why?</label>
            <input type="text" class="form-control" v-model="candidate.skills2Why" placeholder="Leading cloud infrastructure" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Third skill</label>
            <v-select v-model="candidate.skills3" :options="skills"></v-select>
          </div>
          <div class="form-group col-md-6">
            <label for="exampleFormControlInput1">Why?</label>
            <input type="text" class="form-control" v-model="candidate.skills3Why" placeholder="Best way to create back-end services" required>
          </div>
        </div>
        <a class="anchor" id="interests"></a>
        <h2 class="form-header">Interests</h2>
        <div class="form-group">
          <label for="exampleFormControlInput1">Keen on new opportunity scale</label>
          <input type="number" class="form-control" v-model="candidate.opportunityKeenness" placeholder="Any number between 1 to 10" min="1" max="10" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Reason for looking out</label>
          <input type="text" class="form-control" v-model="candidate.opportunityReason" placeholder="Exploring new skills" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Ideal role</label>
          <input type="text" class="form-control" v-model="candidate.idealRole" placeholder="PHP Developer" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Company</label>
          <input type="text" class="form-control" v-model="candidate.idealCompany" placeholder="Google" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Industry</label>
          <input type="text" class="form-control" v-model="candidate.idealIndustry" placeholder="Oil &amp; Gas" required>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Location</label>
          <input type="text" class="form-control" v-model="candidate.idealLocation" placeholder="Cyberjaya" required>
        </div>
        <label for="basic-url">Current Salary</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">RM</span>
          </div>
          <input type="number" v-model="candidate.currentSalary" class="form-control" aria-label="Amount (to the nearest Ringgit)" required>
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
          <input type="number" v-model="candidate.allowances" class="form-control" aria-label="Amount (to the nearest Ringgit)" required>
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
          <input type="number" v-model="candidate.expectedSalary" class="form-control" aria-label="Amount (to the nearest Ringgit)" required>
          <div class="input-group-append">
            <span class="input-group-text">.00</span>
          </div>
        </div>
        <div class="form-group">
          <br>
          <label for="exampleFormControlInput1">Notice Period</label>
          <input type="text" class="form-control" v-model="candidate.noticePeriod" placeholder="1 month" required>
        </div>
        <div v-if="!isDemoUser">
          <div class="form-group">
            <a class="anchor" id="attachments"></a>
            <h2 class="form-header">Attachments</h2>
            <label for="exampleFormControlInput1">Files</label>
            <input type="file" ref="files" class="form-control" multiple v-on:change="handleFilesUpload()" required>
          </div>
          <div class="form-group">
            <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Remove <i class="fas fa-times"></i></span></div>
          </div>
          <div class="form-group">
            <button class="btn btn-success" v-on:click="addFiles()" v-bind:disabled="condition">Add Files</button>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary submits" v-bind:disabled="condition"><i class="fas fa-plus-square"></i> Create Profile</button>
        </div>
        </fieldset>
      </form>
    </div>
    <div class="col-2">
      <div class="position-fixed">
        <ul class="list-group">
          <li class="list-group-item"><a class="anchor-el" href="#candidate-information"><i class="fas fa-info"></i>Candidate Information</a></li>
          <li class="list-group-item"><a class="anchor-el" href="#candidate-team"><i class="fas fa-users"></i>Candidate Team</a></li>
          <li class="list-group-item"><a class="anchor-el" href="#biggest-achievement"><i class="fas fa-trophy"></i>Biggest Achievement</a></li>
          <li class="list-group-item"><a class="anchor-el" href="#top-skills"><i class="fas fa-bolt"></i>Top Skills</a></li>
          <li class="list-group-item"><a class="anchor-el" href="#interests"><i class="fas fa-heart"></i>Interests</a></li>
          <li class="list-group-item"><a class="anchor-el" href="#attachments"><i class="fas fa-paperclip"></i>Attachments</a></li>
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

const BASE_URL = process.env.NODE_ENV === 'development' ? config.dev.serviceUrl : config.build.serviceUrl

export default {
  data() {
    return {
      candidate: {},
      files: [],
      condition: false,
      notifications: [],
      skills: [],
      isDemoUser: false
    }
  },

  created() {
    this.checkAuth()
    this.loadSkills()
  },

  methods: {
    checkAuth: function() {
      let id_token = localStorage.getItem('id_token')
      if (!id_token) {
        this.notifications.push({
          type: 'danger',
          message: 'You\'re not logged in, please do so to submit a candidate'
        })
        this.condition = true
      }

      // To block off demo users submitting illicit content
      if (this.$store.state.member.userProfile.username == 'demouser') {
        this.isDemoUser = true
      }
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

    addFiles() {
      this.$refs.files.click()
    },
    addCandidate: function() {
      // Validation
      var expectedSalary = parseInt(this.candidate.expectedSalary)
      if (isNaN(expectedSalary)) {
        this.notifications.push({
          type: 'danger',
          message: 'Salary must be a number'
        })
        return false
      } else {
        this.candidate.expectedSalary = this.candidate.expectedSalary
      }

      typeof this.candidate.skills1 === 'object' ? this.candidate.skills1 = this.candidate.skills1.label : this.candidate.skills1
      typeof this.candidate.skills2 === 'object' ? this.candidate.skills2 = this.candidate.skills2.label : this.candidate.skills2
      typeof this.candidate.skills3 === 'object' ? this.candidate.skills3 = this.candidate.skills3.label : this.candidate.skills3

      let req = request.post(`${BASE_URL}/api/candidate/create`)
      req.field(this.candidate)
      req.field({ member: this.$store.state.member.userProfile.username })
      this.files.map((file) => {
        req.attach(file.name, file)
      })

      req.end((err, res) => {
        if (err) {
          console.log('Error uploading profile: ', err)
          this.notifications.push({
              type: 'error',
              message: `Error caught: ${err}`
          })
          return false
        }

        if (res.statusCode === 200) {
          setTimeout(() => {
            this.$router.push({name: 'all_candidates'})
          }, 1200)
        }
      })
    },

    // Handles the uploading of files
    handleFilesUpload(){
      let uploadedFiles = this.$refs.files.files;

      // Adds the uploaded file to the files array
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push( uploadedFiles[i] )
      }
    },

    // Removes a select file the user has uploaded
    removeFile(key){
      this.files.splice( key, 1 )
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

input[type="file"] {
  position: absolute;
  top: -500px;
}

.submits {
  width: 100%;
  height: 50px;
  cursor: pointer;
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

svg {
  vertical-align: middle;
  margin-right: 10px;
}
</style>