# frozen_string_literal: true

# User controller
class Api::UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      render json: { status: 'User created successfully' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  def login
    user = User.find_by(email: params[:email].to_s.downcase)

    if user&.authenticate(params[:password])
      auth_token = JsonWebToken.encode(user_id: user.id)
      render json: { auth_token: auth_token, email: user.email }, status: :ok
    else
      render json: { error: 'Invalid username/password' }, status: :unauthorized
    end
  end

  def logout
  end

  def valid_token
    load_current_user!
    render json: { success: 'Token valid' }, status: :ok
  rescue StandardError
    render json: { error: 'Token invalid' }, status: :unauthorized
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
