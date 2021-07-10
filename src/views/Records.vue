<template>
  <div class="records-index">
    <!-- BEGIN section -->
    <br /><br /><br /><br /><br />
    <div class="section py-5">
      <!-- BEGIN section-bg -->
      <div
        class="section-bg"
        style="background-image: url(/assets/img/corporate/mtn3.jpeg)"
      ></div>
      <div class="section-bg bg-gray-800 opacity-3"></div>
      <!-- END section-bg -->

      <!-- BEGIN container -->
      <div class="container position-relative text-white text-center">
        <div class="display-6 fw-bolder">Climbing Records</div>
      </div>
      <!-- END container -->
    </div>
    <!-- END section -->

    <!-- BEGIN section -->
    <div class="section pt-5">
      <!-- BEGIN container -->
      <div class="container">
        <!-- BEGIN row -->
        <div class="row gx-5">
          <!-- BEGIN col-9 -->
          <div class="col-lg-12 ps-lg-5">
            <!-- Filters -->
            <div class="row">
              <div class="col-xl-2">
                <select
                  class="form-select"
                  v-model="gradeFilter"
                  placeholder="Grade"
                >
                  <option value="" disabled selected hidden>Grade</option>
                  <option v-for="grade in grades" v-bind:key="grade">
                    {{ grade }}
                  </option>
                </select>
              </div>
              <div class="col-xl-2">
                <select class="form-select" v-model="resultFilter">
                  <option value="" disabled selected hidden>Result</option>
                  <option value="onsight">onsight</option>
                  <option value="flash">flash</option>
                  <option value="redpoint">redpoint</option>
                  <option value="1 fall">1 fall</option>
                  <option value="2 falls">2 falls</option>
                  <option value="beta">beta</option>
                </select>
              </div>
              <div class="col-xl-2">
                <select class="form-select" v-model="ratingFilter">
                  <option value="" disabled selected hidden>Rating</option>
                  <option value="0.0">0.0</option>
                  <option value="0.5">0.5</option>
                  <option value="1.0">1.0</option>
                  <option value="1.5">1.5</option>
                  <option value="2.0">2.0</option>
                  <option value="2.5">2.5</option>
                  <option value="3.0">3.0</option>
                  <option value="3.5">3.5</option>
                  <option value="4.0">4.0</option>
                </select>
              </div>
              <div class="col-xl-2">
                <select class="form-select" v-model="partnerFilter">
                  <option value="" disabled selected hidden>Partner</option>
                  <option v-for="partner in partners" v-bind:key="partner">
                    {{ partner }}
                  </option>
                </select>
              </div>
              <div class="col-xl-2">
                <button
                  @click="clearFilters"
                  type="button"
                  class="
                    btn btn-lg btn-secondary
                    d-block
                    w-100
                    fw-bold
                    rounded-2
                    height-50px
                  "
                >
                  Clear Filters
                </button>
              </div>
              <div class="col-xl-2"></div>
            </div>
            <br /><br />
            <div
              class="
                p-4
                bg-gray-200
                position-relative
                border-start border-5 border-info
                mb-2
              "
              v-for="record in orderBy(
                filterBy(
                  filterBy(
                    filterBy(
                      filterBy(
                        filterBy(
                          filterBy(
                            filterBy(records, areaFilter, 'route'),
                            cragFilter,
                            'route'
                          ),
                          progressFilter,
                          'in_progress'
                        ),
                        partnerFilter,
                        'partner'
                      ),
                      ratingFilter,
                      'rating'
                    ),
                    resultFilter,
                    'result'
                  ),
                  gradeFilter,
                  'grade'
                ),
                'date',
                -1
              )"
              v-bind:key="record.id"
            >
              <!-- BEGIN row -->
              <div class="row">
                <!-- BEGIN col-4 -->
                <div class="col-2">
                  <div class="d-flex align-items-center">
                    <div class="fs-18px mb-3 fw-bolder line-h-11">
                      {{ record.date }}
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-3">
                  <div class="d-flex align-items-center">
                    <div class="fs-18px mb-3 line-h-11">
                      {{ record.route.name }}
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-6">
                  <div class="d-flex align-items-center">
                    <div class="fs-16px mb-3 line-h-11">
                      {{ record.route.location }}
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div class="fs-16px line-h-16">
                      <a
                        href="#"
                        @click="recordShow(record)"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDetail"
                        ><i class="fas fa-external-link-alt h-40px"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- END row -->
              <!-- BEGIN row -->
              <div class="row">
                <!-- BEGIN col-4 -->
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div class="fs-16px line-h-16">
                      <a :href="record.route.mp_url" target="_blank"
                        ><img
                          src="/assets_admin/img/logo/mtnproject.png"
                          class="rounded h-40px"
                      /></a>
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-1">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Grade:
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px fs-16px">
                        {{ record.grade }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Result:
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px">
                        {{ record.result }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-2" v-if="record.in_progress">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        In Progress:
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px">
                        {{ record.in_progress }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-2" v-if="record.rating">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Rating:
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px">
                        {{ record.rating }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-2">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Partner:
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px">
                        {{ record.partner }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
                <!-- BEGIN col-4 -->
                <div class="col-2" v-if="record.collection">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-bold text-gray-600 fs-12px line-h-12">
                        Collection:
                      </div>
                      <div class="fw-bold text-gray-800 fs-16px">
                        {{ record.collection.name }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END col-4 -->
              </div>
              <!-- END row -->
            </div>

            <hr class="opacity-1" />
          </div>
          <!-- END col-9 -->
        </div>
        <!-- END row -->
      </div>
      <!-- END container -->
    </div>
    <!-- END section -->

    <!-- BEGIN modal -->
    <div class="modal fade" id="modalDetail">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header px-4">
            <div class="fs-24px fw-bolder">
              {{ currentRecord.name }}
            </div>
            <a href="#" class="btn-close" data-bs-dismiss="modal"></a>
          </div>
          <div class="modal-body p-0">
            <div class="row gx-0">
              <div class="col-md-8 p-4 border-end fs-14px line-h-16">
                <p class="mb-0">
                  The Marketing team is responsible for conceptualizing and
                  implementing go-to-market activities to achieve increased
                  usage and visibility. The team covers areas including
                  Campaigns Management, Community, Public Relations,
                  Partnerships, Offline Marketing and Design. The Regional
                  Marketing team is responsible for strategizing and
                  implementing go-to-market activities and working with local
                  teams to localize marketing for the specific markets. The
                  Brand and Growth Marketing team covers all aspects of online
                  and performance marketing for the region. This team is
                  responsible for data-driven solutions, tracking and measuring
                  data to reach the targeted customers.
                </p>
                <hr class="my-4" />
                <div class="h5 mb-3">Job Description:</div>
                <ul>
                  <li>
                    Oversee the livestream online operations team in managing
                    back-end related matters for live shows (e.g. streamer
                    management, vouchers, banners, etc.)
                  </li>
                  <li>
                    Supervise back-end admin during official live shows to
                    ensure smooth flow
                  </li>
                  <li>
                    Plan and manage the workflow of the team to ensure all
                    submissions and tasks are done in a timely manner
                  </li>
                  <li>
                    Provide support to the commercial team in administrative
                    duties i.e. vendor registration and payment, inventory
                    tracking, fulfillment of livestream products post-show
                  </li>
                  <li>
                    Craft and implement improvement plan to improvise day-to-day
                    operational processes
                  </li>
                </ul>

                <div class="h5 mb-3">Requirements:</div>
                <ul>
                  <li>
                    4-5 years of relevant experience with strong operational
                    background
                  </li>
                  <li>Excellent organizational and planning skills</li>
                  <li>
                    Strong communication and team management skills to lead and
                    motivate the team
                  </li>
                  <li>
                    Proactive approach to problem solving, ability to fix issues
                    quickly while maintaining professionalism
                  </li>
                  <li>
                    Ability to manage multiple projects at once in a fast-paced
                    environment with shifting priorities and deadlines
                  </li>
                </ul>
              </div>
              <div class="col-md-4 p-4">
                <hr class="d-block d-md-none mt-n5" />
                <div class="d-flex align-items-center mb-3">
                  <div
                    class="
                      me-3
                      w-40px
                      h-40px
                      rounded-2
                      bg-gray-400
                      text-gray-600
                      d-md-flex d-none
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="far fa-fw fa-map fa-lg"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-gray-600 fs-12px line-h-12">
                      Location:
                    </div>
                    <div class="fw-bold text-gray-800">Kuala Lumpur</div>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div
                    class="
                      me-3
                      w-40px
                      h-40px
                      rounded-2
                      bg-gray-400
                      text-gray-600
                      d-md-flex d-none
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="fa fa-fw fa-code-branch fa-lg"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-gray-600 fs-12px line-h-12">
                      Department:
                    </div>
                    <div class="fw-bold text-gray-800">Marketing</div>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div
                    class="
                      me-3
                      w-40px
                      h-40px
                      rounded-2
                      bg-gray-400
                      text-gray-600
                      d-md-flex d-none
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="fa fa-fw fa-briefcase fa-lg"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-gray-600 fs-12px line-h-12">
                      Level:
                    </div>
                    <div class="fw-bold text-gray-800">Experienced</div>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div
                    class="
                      me-3
                      w-40px
                      h-40px
                      rounded-2
                      bg-gray-400
                      text-gray-600
                      d-md-flex d-none
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="fa fa-fw fa-dollar-sign fa-lg"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-gray-600 fs-12px line-h-12">
                      Salary:
                    </div>
                    <div class="fw-bold text-gray-800">$1000 - $3000</div>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div
                    class="
                      me-3
                      w-40px
                      h-40px
                      rounded-2
                      bg-gray-400
                      text-gray-600
                      d-md-flex d-none
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="far fa-fw fa-clock fa-lg"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-gray-600 fs-12px line-h-12">
                      Working Days:
                    </div>
                    <div class="fw-bold text-gray-800">Mon - Fri</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END modal -->
    <div class="container">
      <h1 class="page-header">Your Climbing Records</h1>
      <!-- Filters -->
      <div class="row">
        <div class="col-xl-2">
          <select class="form-select" v-model="gradeFilter" placeholder="Grade">
            <option value="" disabled selected hidden>Grade</option>
            <option v-for="grade in grades" v-bind:key="grade">
              {{ grade }}
            </option>
          </select>
        </div>
        <div class="col-xl-2">
          <select class="form-select" v-model="resultFilter">
            <option value="" disabled selected hidden>Result</option>
            <option value="onsight">onsight</option>
            <option value="flash">flash</option>
            <option value="redpoint">redpoint</option>
            <option value="1 fall">1 fall</option>
            <option value="2 falls">2 falls</option>
            <option value="beta">beta</option>
          </select>
        </div>
        <div class="col-xl-2">
          <select class="form-select" v-model="ratingFilter">
            <option value="" disabled selected hidden>Rating</option>
            <option value="0.0">0.0</option>
            <option value="0.5">0.5</option>
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
          </select>
        </div>
        <div class="col-xl-2">
          <select class="form-select" v-model="partnerFilter">
            <option value="" disabled selected hidden>Partner</option>
            <option v-for="partner in partners" v-bind:key="partner">
              {{ partner }}
            </option>
          </select>
        </div>
        <div class="col-xl-2">
          <button
            type="button"
            class="
              btn btn-lg btn-secondary
              d-block
              w-100
              fw-bold
              rounded-2
              height-50px
            "
          >
            Clear Filters
          </button>
        </div>
        <div class="col-xl-2"></div>
      </div>
      <div>
        <!-- Crag:
        <select class="form-select" v-model="cragFilter">
          <option value=""></option>
          <option v-for="crag in crags" v-bind:key="crag">
            {{ crag }}
          </option>
        </select>
        Area:
        <select class="form-select" v-model="areaFilter">
          <option value=""></option>
          <option v-for="area in areas" v-bind:key="area">
            {{ area }}
          </option>
        </select> -->
        <div class="form-group row">
          <label class="form-label col-form-label col-lg-1">Crag</label>
          <div class="col-lg-5">
            <input
              type="text"
              name=""
              id="jquery-autocomplete"
              class="form-control"
              placeholder="autocomplete"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="form-label col-form-label col-lg-1">Area</label>
          <div class="col-lg-5">
            <input
              type="text"
              name=""
              id="jquery-autocomplete"
              class="form-control"
              placeholder="autocomplete"
            />
          </div>
        </div>
        <button @click="clearFilters">Clear Filters</button>
      </div>
      <br />
      <div class="row">
        <div class="col-xl-3">
          <button type="button" class="btn btn-primary btn-lg">
            Create New
          </button>
        </div>
      </div>
      <br />
      <!-- Record Create -->
      <form v-on:submit.prevent="recordCreate()">
        <ul style="list-style-type: none">
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <small class="text-danger">This will be in a modal</small>
        <div class="form-group">
          <label>Date:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.date"
            placeholder="pikaday"
          />
        </div>
        <div class="form-group">
          <label>Route:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.route_id"
            placeholder="autocomplete"
          />
        </div>
        <div class="form-group">
          <label>Crag:</label>
          <input
            type="text"
            class="form-control"
            placeholder="autopopulate based on Route"
          />
        </div>
        <div class="form-group">
          <label>Area:</label>
          <input
            type="text"
            class="form-control"
            placeholder="autopopulate based on Route"
          />
        </div>
        <div class="form-group">
          <label>Grade:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.grade"
          />
        </div>
        <div class="form-group">
          <label>Result:</label>
          <select v-model="newRecordParams.result">
            <option value=""></option>
            <option value="onsight">onsight</option>
            <option value="flash">flash</option>
            <option value="redpoint">redpoint</option>
            <option value="1 fall">1 fall</option>
            <option value="2 falls">2 falls</option>
            <option value="beta">beta</option>
          </select>
        </div>
        <div
          class="form-group"
          v-if="
            newRecordParams.result === '1 fall' ||
            newRecordParams.result === '2 falls' ||
            newRecordParams.result === 'beta'
          "
        >
          <label>In progress:</label>
          <select v-model="newRecordParams.in_progress">
            <option value="false"></option>
            <option value="true">true</option>
          </select>
        </div>
        <div
          class="form-group"
          v-if="
            newRecordParams.result === 'onsight' ||
            newRecordParams.result === 'flash' ||
            newRecordParams.result === 'redpoint'
          "
        >
          <label>Rating:</label>
          <select v-model="newRecordParams.rating">
            <option value=""></option>
            <option value="0.0">0.0</option>
            <option value="0.5">0.5</option>
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
          </select>
        </div>
        <div class="form-group">
          <label>Partner:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.partner"
          />
        </div>
        <div class="form-group">
          <label>Comments:</label>
          <input
            type="text"
            class="form-control"
            v-model="newRecordParams.comments"
          />
        </div>
        <div class="form-group">
          <label>Collection:</label>
          <select v-model="newRecordParams.collection_id">
            <option value=""></option>
            <option
              v-for="collection in collections"
              v-bind:key="collection.id"
              :value="collection.id"
            >
              {{ collection.name }}
            </option>
          </select>
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>
      <button @click="clearNewParams()">Clear</button>

      <!-- Records Index & Record Edit/Delete -->
      <div>
        <!-- Records Index -->
        <div
          v-for="record in orderBy(
            filterBy(
              filterBy(
                filterBy(
                  filterBy(
                    filterBy(
                      filterBy(
                        filterBy(records, areaFilter, 'route'),
                        cragFilter,
                        'route'
                      ),
                      progressFilter,
                      'in_progress'
                    ),
                    partnerFilter,
                    'partner'
                  ),
                  ratingFilter,
                  'rating'
                ),
                resultFilter,
                'result'
              ),
              gradeFilter,
              'grade'
            ),
            'date',
            -1
          )"
          v-bind:key="record.id"
        >
          <p>
            <strong>Date: </strong>{{ record.date }} <br />
            <strong>Route: </strong>{{ record.route.name }} <br />
            <strong>Location: </strong>{{ record.route.location }}
            <br />
            <strong>Grade: </strong>{{ record.grade }} <br />
            <strong>Result: </strong>{{ record.result }} <br />
            <span v-if="record.in_progress">
              <strong>In progress: </strong>{{ record.in_progress }} <br />
            </span>
            <span v-if="record.rating">
              <strong>Rating: </strong>{{ record.rating }} <br />
            </span>
            <span v-if="record.partner !== 'N/A'">
              <strong>Partner: </strong>{{ record.partner }} <br />
            </span>
            <strong>Comments: </strong>{{ record.comments }} <br />

            <a :href="record.route.mp_url" target="_blank">MP URL</a
            ><small class="text-danger">small MP logo for link</small> <br />
            <button v-on:click="recordShow(record)">Edit/Delete</button>
          </p>

          <!-- Record Edit/Delete -->
          <dialog id="record-details">
            <form method="dialog">
              <h1>Edit Route Record</h1>
              <ul style="list-style-type: none">
                <li
                  class="text-danger"
                  v-for="editError in editErrors"
                  v-bind:key="editError"
                >
                  {{ error }}
                </li>
              </ul>
              <p>Date: <input type="text" v-model="editRecordParams.date" /></p>
              <p>
                Route:
                <input type="text" v-model="editRecordParams.route_id" /> <br />
                <small class="text-danger">
                  this will show route name instead of id
                </small>
                <!-- NEED THIS TO SHOW ROUTE NAME, BUT PASS ROUTE_ID -->
              </p>
              <p>
                Grade: <input type="text" v-model="editRecordParams.grade" />
              </p>
              <p>
                Result:
                <select v-model="editRecordParams.result">
                  <option value=""></option>
                  <option value="onsight">onsight</option>
                  <option value="flash">flash</option>
                  <option value="redpoint">redpoint</option>
                  <option value="1 fall">1 fall</option>
                  <option value="2 falls">2 falls</option>
                  <option value="beta">beta</option>
                </select>
              </p>
              <p
                v-if="
                  editRecordParams.result === '1 fall' ||
                  editRecordParams.result === '2 falls' ||
                  editRecordParams.result === 'beta'
                "
              >
                In progress:
                <select v-model="editRecordParams.in_progress">
                  <option value="false"></option>
                  <option value="true">true</option>
                </select>
              </p>
              <p
                v-if="
                  editRecordParams.result === 'onsight' ||
                  editRecordParams.result === 'flash' ||
                  editRecordParams.result === 'redpoint'
                "
              >
                Rating:
                <select v-model="editRecordParams.rating">
                  <option value=""></option>
                  <option value="0.0">0.0</option>
                  <option value="0.5">0.5</option>
                  <option value="1.0">1.0</option>
                  <option value="1.5">1.5</option>
                  <option value="2.0">2.0</option>
                  <option value="2.5">2.5</option>
                  <option value="3.0">3.0</option>
                  <option value="3.5">3.5</option>
                  <option value="4.0">4.0</option>
                </select>
              </p>
              <p>
                Partner:
                <input type="text" v-model="editRecordParams.partner" />
              </p>
              <p>
                Comments:
                <input type="text" v-model="editRecordParams.comments" />
              </p>
              <p v-if="!currentRecord.collection">
                <button @click="addCollection()" v-if="!addToCollection">
                  Add to collection
                </button>
                <span v-if="addToCollection">
                  Collection:
                  <select v-model="editRecordParams.collection_id">
                    <option value=""></option>
                    <option
                      v-for="collection in collections"
                      v-bind:key="collection.id"
                      :value="collection.id"
                    >
                      {{ collection.name }}
                    </option>
                  </select>
                </span>
              </p>
              <p v-if="currentRecord.collection">
                Collection: {{ currentRecord.collection.name }} <br />
              </p>
              <button v-on:click="recordUpdate()">Update</button>
              <button v-on:click="recordDestroy()">Delete</button>
              <button @click="clearEditParams()">Close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text-danger {
  color: red;
}
</style>

<script>
import $ from "jquery";
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      records: [],
      newRecordParams: {},
      errors: [],
      editRecordParams: {},
      editErrors: [],
      filter: "",
      gradeFilter: "",
      resultFilter: "",
      ratingFilter: "",
      partnerFilter: "",
      progressFilter: null,
      cragFilter: "",
      areaFilter: "",
      grades: [],
      partners: [],
      crags: [],
      areas: [],
      collections: [],
      currentRecord: {},
      addToCollection: false,
      index: 0,
    };
  },
  created: function () {
    axios.get("/records").then((response) => {
      console.log("Records", response.data);
      this.records = response.data;
      console.log(this.records[476].collection.name);
    });
    axios.get("/grades").then((response) => {
      console.log("Grades", response.data);
      this.grades = response.data;
    });
    axios.get("/partners").then((response) => {
      console.log("Partners", response.data);
      this.partners = response.data;
    });
    axios.get("/crags").then((response) => {
      console.log("Crags", response.data);
      this.crags = response.data;
      var cragListing = this.crags;
      $(() => {
        $("#jquery-autocomplete").autocomplete({
          source: cragListing,
        });
      });
    });
    axios.get("/areas").then((response) => {
      console.log("Areas", response.data);
      this.areas = response.data;
    });
    axios.get("/collections").then((response) => {
      console.log("Collections", response.data);
      this.collections = response.data;
    });
  },
  methods: {
    recordCreate: function () {
      axios
        .post("/records", this.newRecordParams)
        .then((response) => {
          console.log(response.data);
          this.records.push(response.data);
          this.newRecordParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    recordShow: function (record) {
      this.currentRecord = Object.assign(this.currentRecord, record);
      this.editRecordParams = this.currentRecord;
      this.index = this.records.indexOf(record);
      console.log(this.index);
    },
    recordUpdate: function () {
      axios
        .patch(`/records/${this.editRecordParams.id}`, this.editRecordParams)
        .then((response) => {
          console.log(response.data);
          this.records.splice(this.index, 1, response.data);
          this.editRecordParams = {};
          this.addToCollection = false;
        })
        .catch((error) => {
          this.editErrors = error.response.data.errors;
        });
    },
    recordDestroy: function (record) {
      if (confirm("Are you sure you want to delete this record?")) {
        axios.delete(`/records/${record.id}`).then((response) => {
          console.log(response.data);
          this.records.splice(this.index, 1);
        });
      }
    },
    clearFilters: function () {
      this.gradeFilter = "";
      this.resultFilter = "";
      this.ratingFilter = null;
      this.partnerFilter = "";
      this.progressFilter = null;
      this.cragFilter = "";
      this.areaFilter = "";
      var inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "checkbox") {
          inputs[i].checked = false;
        }
      }
    },
    clearNewParams: function () {
      this.newRecordParams = {};
    },
    clearEditParams: function () {
      this.editRecordParams = {};
      this.addToCollection = false;
    },
    addCollection: function () {
      this.addToCollection = true;
    },
    changeProgressFilter: function () {
      if (this.progressFilter === null) {
        this.progressFilter = true;
      } else {
        this.progressFilter = null;
      }
    },
  },
};
</script>
