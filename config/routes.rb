Rails.application.routes.draw do
  root to: redirect('/events')

  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/edit', to: 'site#index'

  namespace :api do
    resources :users, only: :create do
      collection do
        post 'valid_token'
        post 'login'
        post 'logout'
      end
    end
    resources :events, only: %i[index show create destroy update]
  end
end
