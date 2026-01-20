import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Briefcase, GraduationCap, Building2, Quote, Activity, FileText, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface UserProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  bio: string;
  joinDate: string;
}

export const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState<UserProfileData>({
    fullName: user?.username === 'admin' ? 'Administrator' : 'Piyush Verma',
    email: user?.username === 'admin' ? 'admin@institution.edu' : 'piyush.verma@institution.edu',
    phone: '+1 (555) 123-4567',
    department: user?.username === 'admin' ? 'IT Administration' : 'Computer Science',
    location: 'Main Campus, Building A',
    bio: user?.username === 'admin'
      ? 'System administrator responsible for managing institutional data and user access.'
      : 'Student interested in AI and machine learning. Active participant in campus activities.',
    joinDate: '2023-01-15'
  });

  const [editData, setEditData] = useState<UserProfileData>(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-3 animate-in fade-in duration-500 pb-2">
      {/* Banner & Header Section */}
      <div className="relative">
        <div className="h-24 md:h-28 rounded-t-[2rem] bg-gradient-to-r from-primary/20 via-primary/5 to-background border-x border-t border-foreground/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 p-8 opacity-50">
            <Building2 className="h-40 w-40 text-primary/10 -rotate-12 transform translate-x-8 -translate-y-8" />
          </div>
        </div>

        <div className="mx-6 md:mx-10 relative -mt-8 md:-mt-10 mb-2 flex flex-col md:flex-row items-end justify-between gap-3">
          <div className="flex items-end gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-500 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-[2rem] bg-background border-4 border-background flex items-center justify-center overflow-hidden">
                <Avatar className="h-full w-full rounded-none">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.fullName} className="object-cover" />
                  <AvatarFallback className="text-2xl md:text-3xl font-black bg-primary/10 text-primary w-full h-full flex items-center justify-center rounded-none">
                    {getInitials(profileData.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="mb-1">
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-foreground mb-0.5 flex items-center gap-2">
                {profileData.fullName}
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[9px] py-0.5 px-2 hidden md:inline-flex">
                  {user?.role === 'admin' ? 'Administrator' : 'Student'}
                </Badge>
              </h1>
              <div className="flex items-center gap-3 text-foreground/60 text-xs md:text-sm font-medium">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {profileData.department}
                </span>
                <span className="hidden md:flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {profileData.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-1 w-full md:w-auto">
            {!isEditing ? (
              <Button onClick={handleEdit} size="sm" className="flex-1 md:flex-none rounded-xl bg-foreground text-background hover:bg-primary hover:text-white font-bold tracking-wide shadow-lg transition-all h-8 text-xs">
                <Edit className="h-3 w-3 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2 w-full md:w-auto">
                <Button onClick={handleSave} size="sm" className="flex-1 md:flex-none rounded-xl bg-primary text-white hover:bg-primary/90 h-8 text-xs">
                  <Save className="h-3 w-3 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} size="sm" variant="outline" className="flex-1 md:flex-none rounded-xl border-foreground/10 hover:bg-foreground/5 h-8 text-xs">
                  <X className="h-3 w-3 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Days Active', value: Math.floor((Date.now() - new Date(profileData.joinDate).getTime()) / (1000 * 60 * 60 * 24)), icon: Calendar },
          { label: 'Queries Run', value: user?.role === 'admin' ? '500+' : '124', icon: MessageSquare },
          { label: 'Files Synced', value: user?.role === 'admin' ? '150+' : '12', icon: FileText },
          { label: 'Efficiency', value: '98%', icon: Activity },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3 }}
            className="p-2 md:p-3 rounded-[1.2rem] bg-foreground/[0.03] border border-foreground/5 backdrop-blur-sm flex flex-col items-center justify-center text-center group hover:border-primary/20 transition-all"
          >
            <div className="p-1.5 bg-background rounded-lg mb-1 shadow-sm group-hover:bg-primary/10 transition-colors">
              <stat.icon className="h-3.5 w-3.5 text-foreground/40 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-lg md:text-xl font-black text-foreground mb-0">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Personal Info */}
        <Card className="md:col-span-1 border-foreground/10 bg-foreground/[0.02] backdrop-blur-3xl shadow-xl rounded-[2rem]">
          <CardHeader className="pb-1 pt-3 px-5">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <User className="h-3.5 w-3.5 text-primary" />
              Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-5 pb-4">
            <div className="space-y-1">
              <Label className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Full Name</Label>
              {isEditing ? (
                <Input value={editData.fullName} onChange={(e) => setEditData({ ...editData, fullName: e.target.value })} className="h-8 text-sm bg-background border-foreground/10" />
              ) : (
                <div className="font-semibold text-sm">{profileData.fullName}</div>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Email</Label>
              {isEditing ? (
                <Input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="h-8 text-sm bg-background border-foreground/10" />
              ) : (
                <div className="font-medium text-sm flex items-center gap-2 truncate">
                  <Mail className="h-3 w-3 text-foreground/40 flex-shrink-0" />
                  <span className="truncate">{profileData.email}</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Phone</Label>
              {isEditing ? (
                <Input value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="h-8 text-sm bg-background border-foreground/10" />
              ) : (
                <div className="font-medium text-sm flex items-center gap-2">
                  <Phone className="h-3 w-3 text-foreground/40" />
                  {profileData.phone}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Academic/Inst Info */}
        <Card className="md:col-span-1 border-foreground/10 bg-foreground/[0.02] backdrop-blur-3xl shadow-xl rounded-[2rem]">
          <CardHeader className="pb-1 pt-3 px-5">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              Academic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 px-5 pb-4">
            <div className="space-y-1">
              <Label className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Department</Label>
              {isEditing ? (
                <Input value={editData.department} onChange={(e) => setEditData({ ...editData, department: e.target.value })} className="h-8 text-sm bg-background border-foreground/10" />
              ) : (
                <div className="font-semibold text-sm">{profileData.department}</div>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Location</Label>
              {isEditing ? (
                <Input value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} className="h-8 text-sm bg-background border-foreground/10" />
              ) : (
                <div className="font-medium text-sm flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-foreground/40" />
                  {profileData.location}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-foreground/50 text-[10px] uppercase tracking-widest font-bold">Joined</Label>
              <div className="font-medium text-sm flex items-center gap-2">
                <Calendar className="h-3 w-3 text-foreground/40" />
                {new Date(profileData.joinDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card className="md:col-span-1 border-foreground/10 bg-foreground/[0.02] backdrop-blur-3xl shadow-xl rounded-[2rem]">
          <CardHeader className="pb-1 pt-3 px-5">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <Quote className="h-3.5 w-3.5 text-primary" />
              Bio
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full px-5 pb-4">
            {isEditing ? (
              <Textarea
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                rows={4}
                className="bg-background border-foreground/10 resize-none h-[100px] text-sm"
              />
            ) : (
              <div className="italic text-foreground/70 leading-relaxed p-3 bg-background/50 rounded-2xl border border-foreground/5 h-full relative text-[13px]">
                <span className="text-2xl absolute -top-2 -left-2 text-primary/20">"</span>
                {profileData.bio}
                <span className="text-2xl absolute -bottom-4 -right-2 text-primary/20">"</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};