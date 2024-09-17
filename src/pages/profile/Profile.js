import profileImg from '../../components/images/user2.jpg';
import './Profile.css';
import TopBar from '../../components/topBar/TopBar';

function Profile(){
    return(
        <>
        <TopBar/>
        <section class="py-5-my-5">
		<div class="container">
			<div class="bg-white shadow rounded-lg d-block d-sm-flex">
				<div class="Calla-1">
					<div class="profile-tab-nav border-right" id="nalla">
						<div class="p-4">
							<div class="img-circle text-center mb-3">
								<img src={profileImg} alt="Image" class="shadow"/>
							</div>
							<h4 class="text-center">Kiran Acharya</h4>
						</div>
						<div class="nav flex-column nav-pills" id="v-pills-tab">
							<i class="fa fa-home text-center mr-1"></i>
							PROFILE EDIT →
						</div>
					</div>
					<div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
						<div class="tab-pane fade show active" id="account">
							<div class="row">
								<div class="cola-1">
									<div class="col-md-61">
										<div class="form-group">
											<div><label class="leba-1">First Name</label></div>
											<div><input type="text" class="form-control" value="" placeholder="Kiran" /></div>
										</div>
									</div>
									<div class="col-md-62">
										<div class="form-group">
											<div><label id="leba-1">Last Name</label></div>
											<div><input type="text" class="form-control" value="" placeholder="Acharya" /></div>
										</div>
									</div>
								</div>
								<div class="cola-2">
									<div class="col-md-63">
										<div class="form-group">
											<div><label id="leba-1">Email</label></div>
											<div><input type="text" class="form-control"
													value="" placeholder="kiranacharya287@gmail.com" /></div>
										</div>
									</div>
									<div class="col-md-64">
										<div class="form-group">
											<div><label id="leba-1">Phone number</label></div>
											<div><input type="text" class="form-control" value="" placeholder="+91 9876543215" /></div>
										</div>
									</div>
								</div>
								<div class="cola-3">
									<div class="col-md-65">
										<div class="form-group">
											<div><label id="leba-1">State</label></div>
											<div><input type="text" class="form-control" value="" placeholder="Maharashtra" /></div>
										</div>
									</div>
									<div class="col-md-66">
										<div class="form-group">
											<div><label id="leba-1">District</label></div>
											<div><input type="text" class="form-control" value="" placeholder="Pune"  /></div>
										</div>
									</div>
								</div>

								<div class="cola-3">
									<div class="col-md-65">
										<div class="form-group">
											<div><label id="leba-1">Address line 1</label></div>
											<div><input type="text" class="form-control" value="" placeholder="Address line 1" /></div>
										</div>
									</div>
									<div class="col-md-66">
										<div class="form-group">
											<div><label id="leba-1">Address line 2</label></div>
											<div><input type="text" class="form-control" value="" placeholder="Address line 2" /></div>
										</div>
									</div>
								</div>

								<div class="cola-3">
									<div class="col-md-65">
										<div class="form-group">
											<div><label id="leba-1">Company</label></div>
											<div><input type="text" class="form-control" value="" placeholder="Kiran Workspace" /></div>
										</div>
									</div>
									<div class="col-md-66">
										<div class="form-group">
											<div><label id="leba-1">Designation</label></div>
											<div><input type="text" class="form-control" value="" placeholder="UI Developer" /></div>
										</div>
									</div>
								</div>
								
							

							</div>
							<div class="btn-pa">
								<div class="btn-boy">
									<button class="btn-primary">Update</button>
									<button class="btn-primary">Cancel</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</section>
    </>
    );
}

export  default Profile;