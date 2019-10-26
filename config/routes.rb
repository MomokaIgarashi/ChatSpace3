Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  get  'chat_groups'  =>  'groups#' 
  

  resources :users, only: [:index, :edit, :update] 
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create] 
   end
  end