<template lang="vi">
<div>
  <div class="row">
      <div class="col-lg-7">
          <div class="row">
              <div class="col-lg-4">
                  <b-form-group>
                      <input type="text" class="form-control" v-model="search" placeholder="Enter name workstation" />
                  </b-form-group>
              </div>
              <div class="col-lg-4">
                      <b-form-select v-model="status" aria-placeholder="a" style="cursor: pointer;">
                          <b-form-select-option :value="null" disabled>Status</b-form-select-option>
                              <option value=1>
                                  Opening
                              </option>
                              <option value=2>
                                  Closing
                              </option>
                      </b-form-select>
                  </div>
              <b-button style="height: 42px;" variant="light" class="btn-refresh" @click="refresh">
                      <i class="fas fa-sync"></i>
              </b-button>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import TableSearch from "../../../../components/datatable/table-search";
import "vue2-datepicker/locale/vi";

export default {
  name: "product-filter",
  components: {
    TableSearch,
  },
  data() {
    return {
      search: "",
      status: null,
    };
  },
  watch: {
    search: {
      handler: function () {
        let query = {
          ...this.$route.query,
        };
        if (this.search == '') {
          delete query.search
          this.$router.push({
            name: this.$route.name,
            query: query,
          });
        }
        if (this.search.length > 0) {
          query.search = this.search;
          setTimeout(() => {
            if (query.search == this.search || (this.search.length < query.search.length && query.search.length == this.search.length)) {
              this.$router.push({
                name: this.$route.name,
                query: query,
              });
            }
          }, 800);
        } else {
          delete query.search;
        }
      },
      deep: true,
    },
    status: {
      handler: function () {
        let query = {
          ...this.$route.query,
        };
        if (this.status) {
          query.status = this.status;
        } else {
          delete query.status;
        }
        this.$router.push({
          name: this.$route.name,
          query: query,
        });
      },
      deep: true,
    },
  },
  methods: {
    refresh() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    getData() {
      let query = this.$route.query
      if (query.search) {
        this.search = query.search
      }
      if (query.status) {
        this.status = query.status
      }
    }
  },
  async created() {
    this.getData();
  },
};
</script>

<style scoped>
.mx-datepicker,
.mx-input-wrapper,
.mx-input {
  height: 41px !important;
}
</style>
