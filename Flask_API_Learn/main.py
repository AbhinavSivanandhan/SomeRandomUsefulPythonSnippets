from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort
from flask_sqlalchemy import SQLAlchemy
#check your git log from now on, to have different versions, obviously, rather than all this commenting, check git log to see all commits
app=Flask(__name__)
api=Api(app)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///database.db'
db=SQLAlchemy(app)
dc.create_all()#only run this code once(since, otherwise it will create/reinitialise again

class VideoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name=db.Coumn(db.String(100),nullable=False)#can't be empty
    views = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return f"Video(name={name}, views={views}, likes={likes})"

video_puts_args = reqparse.RequestParser()
video_puts_args.add_argument("name", type=str, help="Name of the video is required", required=True)
video_puts_args.add_argument("views", type=int, help="Views of the video is required", required=True)
video_puts_args.add_argument("likes", type=int, help="Likes on the video is required", required=True)

videos={}
def abort_video(video_id):
    if video_id not in videos:
        abort(404,message="Video id is not valid")           
def abort_if_video_exists(video_id):
    if video_id in videos:
        abort(409,message="Video already exists with that ID...")
class Video(Resource):
    def get(self,video_id): 
        abort_video(video_id)
        return videos[video_id]
    
    def put(self,video_id):
        abort_if_video_exists(video_id)
        args=video_puts_args.parse_args()
        videos[video_id]=args
       
        return videos[video_id],201 #200s codes are success codes
        #return {video_id: args}
        #print(request.form) 
        #return {}
    def delete(self, video_id):
        abort_video(video_id)
        del videos[video_id]
        return '',204
api.add_resource(Video,"/video/<int:video_id>")
if __name__=="__main__":
    app.run(debug=True)

