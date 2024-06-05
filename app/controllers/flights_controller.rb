class FlightsController < ApplicationController
  before_action :set_flight, only: %i[ show edit update destroy ]
  before_action :set_itinerary, only: %i[ new create edit update]

  # GET /flights or /flights.json
  def index
    @flights = Flight.all
  end

  # GET /flights/1 or /flights/1.json
  def show
  end

  # GET /flights/new
  def new
    @flight = @itinerary.flights.build
  end

  # GET /flights/1/edit
  def edit
  end

  # POST /flights or /flights.json
  def create
    @flight = @itinerary.flights.build(flight_params)
    @flight.user_id = @itinerary.user_id

    respond_to do |format|
      if @flight.save
        format.html { redirect_to itinerary_url(@itinerary), notice: "Flight was successfully created." }
        format.json { render :show, status: :created, location: @flight }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /flights/1 or /flights/1.json
  def update
    respond_to do |format|
      if @flight.update(flight_params)
        format.html { redirect_to itinerary_flight_url(@itinerary, @flight), notice: "Flight was successfully updated." }
        format.json { render :show, status: :ok, location: @flight }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /flights/1 or /flights/1.json
  def destroy
    itinerary = @flight.itinerary
    @flight.destroy!

    respond_to do |format|
      format.html { redirect_to itinerary_path(itinerary), notice: "Flight was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_flight
      @flight = Flight.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def flight_params
      params.require(:flight).permit(:flight_number, :departure_time, :arrival_time, :origin, :destination)
    end

    def set_itinerary
      @itinerary = Itinerary.find(params[:itinerary_id])
    end
end
