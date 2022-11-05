/
<template>
  <div>
    <page-header :title="`Edit account`" :items="breadcrumbs" />
    <div>
      <b-row>
        <b-col class="col-lg-8">
          <b-card>
            <b-form-group>
              <label>First and last name <span class="red">*</span></label>
              <b-input v-model="form.name" placeholder="Enter first and last name" />
            </b-form-group>
            <b-form-group>
              <label>Phone number<span class="red">*</span></label>
              <b-input v-model="form.phone" placeholder="Enter phone number" />
            </b-form-group>
            <b-form-group v-if="!isChange">
              <label>Position <span class="red">*</span></label>
              <b-form-select v-model="form.position">
                <b-form-select-option disabled :value="null">
                  Choose a position
                </b-form-select-option>
                <b-form-select-option :value=1>
                  Admin
                </b-form-select-option>
                <b-form-select-option :value=99>
                  User
                </b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <div v-if="showAddErrorMessage" class="alert alert-danger" role="alert">
                {{ addErrorMessage }}
              </div>
              <b-button variant="success" class="mr-2" @click.prevent="create">
                Save
              </b-button>
              <b-button variant="danger" @click.prevent="toListView">
                Cancel
              </b-button>
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import PageHeader from "../../../components/page-header";
import { httpClient } from "../../../_utils/httpClient";
import Swal from "sweetalert2";

export default {
  name: "create",
  components: {
    PageHeader,
  },
  data: function () {
    return {
      breadcrumbs: [
        {
          text: "Home",
          to: "/admin/home",
        },
        {
          text: "User",
          to: "/admin/users",
        },
        {
          text: "Update",
          to: "#",
          active: true,
        },
      ],
      showAddErrorMessage: false,
      addErrorMessage: "",
      isChange: false,
      form: {
        phone: "",
        name: "",
        position: null,
      },
    };
  },
  watch: {
  },
  methods: {
    isChangePosition() {
      let id = localStorage.getItem('id');
       this.isChange =  (id == this.$route.params.id) ? true : false;
    },
    async toListView() {
      await this.$router.push({
        name: "admin.users.list",
      });
    },
    validator() {
      let mappingErrorName = {
        name: "Enter first and last name",
        phone: "Phone",
        position: "Position",
      };

      for (let key in mappingErrorName) {
        if (!this.form[key]) {
          this.showAddErrorMessage = true;
          this.addErrorMessage = mappingErrorName[key] + ` can't be empty.`;
          return false;
        }
      }
      return true;
    },

    async create() {
      await Swal.queue([
        {
          title: "Update this user?",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          cancelButtonColor: "#f46a6a",
          confirmButtonColor: "#34c38f",
          showCancelButton: true,
          showconfirmButton: true,
          preConfirm: async () => {
            this.showAddErrorMessage = false;
            if (!this.validator()) return;
            let payload = {
              ...this.form,
            };
            let response = await httpClient.post(`user/update`, payload);

            if (response.data.code === 0) {
              Swal.insertQueueStep({
                title: "Save successful",
              }),
                await this.$router.push({
                  name: `admin.users.list`,
                });
            } else {
              this.showAddErrorMessage = true;
              this.addErrorMessage = response.data.message;
            }
            return true;
          },
        },
      ]);
    },
    async getById(id) {
      let response = await httpClient.get(`user`, {
        params: {
          id,
        }
      })
      return response.data.data;
    },
  },
  async created() {
    let cloneItem = await this.getById(this.$route.params.id);
    this.form = cloneItem;
    this.isChangePosition();
  },
};
</script>

<style>
.red {
  color: red;
}

.text-sm {
  font-weight: 600;
}

.vib-open {
  overflow: hidden;
}

.no-scroll {
  overflow-y: hidden;
}

.vib-hideable {
  transition: opacity 0.5s ease;
}

.vib-hidden {
  opacity: 0;
}

/* elements styling */

.vib-container {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.85);
  box-sizing: border-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2000;
  -webkit-align-items: center;
  -moz-box-sizing: border-box;
  -webkit-justify-content: center;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
}

.vib-content {
  position: relative;
  margin: 0;
  display: block;
}

.vib-image {
  cursor: pointer;
  max-height: calc(100vh);
  cursor: pointer;
  display: block;
  height: auto;
  margin: 0 auto;
  max-width: 100%;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.vib-thumbnail-wrapper {
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 12px;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  display: inline-block;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  top: 0px;
}

.vib-thumbnail {
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, 0.2);
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px 2px 0 2px;
  overflow: hidden;
  width: 50px;
}

.vib-thumbnail-active {
  background-position: center;
  background-size: cover;
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px white;
  cursor: pointer;
  display: inline-block;
  height: 50px;
  margin: 2px 2px 0 2px;
  overflow: hidden;
  width: 50px;
}

.vib-footer {
  box-sizing: border-box;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  line-height: 1.3;
  padding: 10px;
  justify-content: space-between;
  text-align: left;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.vib-footer-count {
  flex-shrink: 0;
  padding-left: 1em;
}

.vib-close {
  background: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  outline: none;
  position: fixed;
  top: 0;
  right: 0;
  vertical-align: bottom;
  height: 65px;
  width: 60px;
  padding: 15px 12px 15px 20px;
  border-bottom-left-radius: 50%;
}

.vib-arrow {
  background: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  outline: none;
  padding: 10px;
  position: absolute;
  top: 50%;
  user-select: none;
  height: 65px;
  margin-top: -60px;
  width: 60px;
}

.vib-arrow-left {
  left: 0;
  padding-right: 20px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

.vib-arrow-right {
  right: 0;
  padding-left: 20px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}

@media (min-width: 500px) {
  .vib-thumbnail-arrow {
    width: 40px;
  }
}

@media (min-width: 768px) {
  .vib-arrow {
    width: 60px;
  }
}

/* image transitions */

.vib-image-transition-enter-active,
.vib-image-transition-leave-active {
  transition: opacity 0.2s ease;
}

.vib-image-transition-enter,
.vib-image-transition-leave-to {
  opacity: 0;
}

.vib-image-no-transition-enter-active,
.vib-image-no-transition-leave-active {
  transition: none;
}

.vib-image-no-transition-enter,
.vib-image-no-transition-leave-to {
  opacity: 0;
}

/* container transitions */

.vib-container-transition-enter-active,
.vib-container-transition-leave-active {
  transition: opacity 0.3s ease;
}

.vib-container-transition-enter,
.vib-container-transition-leave-to {
  opacity: 0;
}

.video-background {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 */
  height: 0;
  width: calc(90vw);
  height: calc(90vh);
}

.video-background iframe {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 50.25vw;
  max-height: 100vh;
  max-width: 182.78vh;
}
</style>
<style lang="scss" scoped>
.action-column {
  width: 120px;
  text-align: center;
}

.font {
  font-size: 15px;
  font-weight: 400;
  font-style: italic;
}
</style>
