<template>
<fragment>
    <!-- Filter -->
    <!--        <b-row id="tickets-table_length" class="dataTables_length mb-3">-->
    <!--            <b-col sm=12 md=2>-->
    <!--                <b-form-input-->
    <!--                        size="sm"-->
    <!--                        v-model="filter"-->
    <!--                        type="search"-->
    <!--                        placeholder="Tìm kiếm..."-->
    <!--                ></b-form-input>-->
    <!--            </b-col>-->
    <!--            <b-col sm=12 md=10>-->
    <!--                &lt;!&ndash; when use datatable component, use slot name filter to add custom filter &ndash;&gt;-->
    <!--                <slot name="filter"></slot>-->
    <!--            </b-col>-->
    <!--        </b-row>-->
    <!-- End Filter -->
    <!--        <div class="row mb-3">-->
    <!--            <div class="col-sm-12 col-md-6">-->
    <!--                <div id="tickets-table_filter" class="dataTables_filter">-->
    <!--                    <slot name="crud-btn" v-bind:length="selected.length">-->

    <!--                        <router-link to="add">-->
    <!--                            <b-button size="sm" variant="primary" >-->
    <!--                                Thêm mới-->
    <!--                            </b-button>-->
    <!--                        </router-link>-->
    <!--                        &lt;!&ndash; if row(s) selected, show delete and edit button&ndash;&gt;-->
    <!--                        <b-button variant="info" size="sm" v-if="selected.length > 0" class="ml-2">Sửa</b-button>-->
    <!--                        <b-button variant="danger" size="sm" v-if="selected.length > 0" class="ml-2">Xoá</b-button>-->
    <!--                    </slot>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="col-sm-12 col-md-6">-->
    <!--                <div class="dataTables_filter float-right">-->
    <!--                    <b-button size="sm" @mouseover="hover = true" @mouseleave="hover = false" :class="{ 'btn-excel': hover }">Xuất dữ liệu</b-button>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!-- Table -->
    <div class="table-responsive mb-0">
        <b-table ref="datatable" hover :items="data" :fields="fields" selectable="" :select-mode="'multi'" responsive="sm" :per-page="perPage" :current-page="currentPage" :selected-variant="'warning'" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered" @row-clicked="clickRow">
            <template v-slot:head(checkbox)="">
                <b-form-checkbox @click.native="selectAllRows" v-model="allSelected"></b-form-checkbox>
            </template>
            <template v-slot:cell(checkbox)="row">
                <b-form-checkbox @click.prevent="select" :value="row.item.id" v-model="selected"></b-form-checkbox>
            </template>
        </b-table>
    </div>
    <!--        <div class="row">-->
    <!--            <div class="col-sm-12 col-md-6">-->
    <!--                <div id="tickets-table_length" class="dataTables_length">-->
    <!--                    <label class="d-inline-flex align-items-center">-->
    <!--                        Show&nbsp;-->
    <!--                        <b-form-select class="mx-2" v-model="perPage" size="sm"-->
    <!--                                       :options="pageOptions"></b-form-select>&nbsp;entries-->
    <!--                    </label>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="col-sm-12 col-md-6">-->
    <!--                <div class="dataTables_paginate paging_simple_numbers float-right">-->
    <!--                    <ul class="pagination pagination-rounded mb-0">-->
    <!--                        &lt;!&ndash; pagination &ndash;&gt;-->
    <!--                        <b-pagination v-model="currentPage" :total-rows="rows"-->
    <!--                                      :per-page="perPage"></b-pagination>-->
    <!--                    </ul>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
</fragment>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => ([])
        }
    },
    watch: {
        allSelected: {
            handler: function (current) {
                console.log(current)
            }
        }
    },
    data() {
        return {
            // fake var to have no error
            allSelected: false,
            selected: [],
            options: [{
                    value: 'none',
                    text: 'Please select an option'
                },
                {
                    value: 'a',
                    text: 'This is First option'
                },
                {
                    value: 'b',
                    text: 'Selected Option'
                },
            ],
            filteredOn: true,
            hover: false,
            // end fake var
            totalRows: 1,
            currentPage: 1,
            perPage: 25,
            pageOptions: [25, 50, 100],
            filter: null,
            filterOn: [],
            sortBy: "age",
            sortDesc: false,
            fields: [{
                    key: "checkbox",
                    sortable: false
                },
                {
                    key: "name",
                    sortable: true
                },
                {
                    key: "position",
                    sortable: true
                },
                {
                    key: "office",
                    sortable: true
                },
                {
                    key: "age",
                    sortable: true
                },
                {
                    key: "date",
                    sortable: true
                },
                {
                    key: "salary",
                    sortable: true
                }
            ]
        };
    },
    computed: {
        /**
         * Total no. of records
         */
        rows() {
            return this.data.length;
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.data.length;
    },
    methods: {
        /**
         * Search the table data with search input
         */
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        select() {
            this.selected = [];
            console.log(this.allSelected)
            this.$refs.myTable.selectAllRows();
            if (!this.selectAll) {
                for (let i in this.data) {
                    this.selected.push(this.data[i].id);
                }
            } else {
                console.log(this.allSelected)
                this.$refs.myTable.clearSelected();
            }
        },
        selectAllRows() {
            this.$refs.datatable.selectAllRows()
        },
        clickRow(entry) {
            console.log(entry)
        }
    }
}
</script>

<style scoped>
/*
      Animation cho enter và leave có thể có giá trị
      duration và timing function khác nhau.
    */
.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to

/* Trước 2.1.8 thì dùng .slide-fade-leave-active */
    {
    transform: translateX(10px);
    opacity: 0;
}

.btn-excel {
    background-color: #23a566;
    border-color: #23a566;
}
</style>
