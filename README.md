# README



## users_テーブル
|Column   |Type     |Options                       |
|------   |----     |-------                       |
|name     |string   |null: false, add_index: true  |

### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :messages

## groups_テーブル
|Column   |Type     |Options                       |
|------   |----     |-------                       |
|name     |string   |null: false, unique: true     |

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages 

## messages_テーブル
|Column   |Type     |Options                       |
|------   |----     |-------                       |
|user_id  |integer  |null: false, foreign_key: true|
|group_id |integer  |null: false, foreign_key: true|
|body     |text     |                              |
|imgage   |string   |                              |

### Association
- belongs_to :group
- belongs_to :user


## groups_usersテーブル
|Column   |Type     |Options                       |
|------   |----     |-------                       |
|user_id  |integer  |null: false, foreign_key: true|
|group_id |integer  |null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

