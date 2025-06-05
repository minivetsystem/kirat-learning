"use client"


import { useState, useEffect } from "react"
import axios from "axios"
import { Download, Search, Eye, Trash2, ChevronUp, ChevronDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { authFetch } from "@/components/auth/AuthFetch"



export default function Registration() {
  // Initialize users and filteredUsers as empty arrays to prevent undefined errors
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [viewUser, setViewUser] = useState(null)
  const itemsPerPage = 10
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchUsers()
  }, [currentPage, sortField, sortDirection])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {

      const response = await authFetch(`/api/registration`, {
                    method: "GET",
                  })
      // In a real application, you would include pagination parameters
      // const response = await axios.get("/api/registration", {
      //   params: {
      //     page: currentPage,
      //     limit: itemsPerPage,
      //     sortField,
      //     sortDirection,
      //   },
      // })
      const data = await response.json();

      // Assuming the API returns { data: User[], totalPages: number }
      setUsers(data.data)
      setFilteredUsers(data.data)
      setTotalPages(data.totalPages || Math.ceil(data.data.length / itemsPerPage))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }



  // Update the useEffect that handles search to safely check for users
  useEffect(() => {
    if (!users) return // Add safety check

    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.city.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredUsers(filtered.slice(0, itemsPerPage))
      setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      setFilteredUsers(sortUsers(users, sortField, sortDirection).slice(startIndex, endIndex))
      setTotalPages(Math.ceil(users.length / itemsPerPage))
    }
  }, [searchTerm, users, currentPage, itemsPerPage, sortField, sortDirection])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }


  const sortUsers = (usersToSort, field, direction) => {
    if (!usersToSort || usersToSort.length === 0) return []

    return [...usersToSort].sort((a, b) => {
      if (
        field === "name" ||
        field === "email" ||
        field === "phone" ||
        field === "course" ||
        field === "state" ||
        field === "city"
      ) {
        return direction === "asc" ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field])
      } else if (field === "createdAt" || field === "dob") {
        return direction === "asc"
          ? new Date(a[field]).getTime() - new Date(b[field]).getTime()
          : new Date(b[field]).getTime() - new Date(a[field]).getTime()
      } else if (field === "id") {
        return direction === "asc" ? a.id - b.id : b.id - a.id
      }
      return 0
    })
  }


  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
       
       
const response = await authFetch(`/api/registration/${userId}`, {
                    method: "DELETE",
                  })

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to delete user");
                  }
       
        if (users) {
          setUsers(users.filter((user) => user.id !== Number.parseInt(userId)))
        }
        if (filteredUsers) {
          setFilteredUsers(filteredUsers.filter((user) => user.id !== Number.parseInt(userId)))
        }

        toast({
          title: "Success",
          description: "User deleted successfully",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete user. Please try again.",
          variant: "destructive",
        })
        console.error("Error deleting user:", error)
      }
    }
  }

  const handleViewUser = (user) => {
    setViewUser(user)
  }

  const handleViewDocument = (documentUrl) => {
    setSelectedDocument(documentUrl)
  }

  const exportToExcel = async () => {
  try {
    const response = await axios.get("/api/registration/export", {
      responseType: "blob",
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "registered-users.xlsx");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Excel file downloaded successfully.",
      });
    } else {
      throw new Error("File download failed with status " + response.status);
    }
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    toast({
      title: "Error",
      description: "Failed to download Excel file. Please try again.",
      variant: "destructive",
    });
  }
};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const renderSortIcon = (field) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Registration</h1>
          <p className="text-muted-foreground">Manage your registered users</p>
        </div>
        <Button onClick={exportToExcel} className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Export to Excel
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, phone, course, state, or city..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select
            value={sortField}
            onValueChange={(value) => {
              setSortField(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="dob">Date of Birth</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="city">City</SelectItem>
              <SelectItem value="createdAt">Registration Date</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          >
            {sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] cursor-pointer" onClick={() => handleSort("id")}>
                <div className="flex items-center">ID {renderSortIcon("id")}</div>
              </TableHead>
              <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">Name {renderSortIcon("name")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                <div className="flex items-center">Email {renderSortIcon("email")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("phone")}>
                <div className="flex items-center">Phone {renderSortIcon("phone")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("dob")}>
                <div className="flex items-center">Date of Birth {renderSortIcon("dob")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("course")}>
                <div className="flex items-center">Course {renderSortIcon("course")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("state")}>
                <div className="flex items-center">State {renderSortIcon("state")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("city")}>
                <div className="flex items-center">City {renderSortIcon("city")}</div>
              </TableHead>
              <TableHead>Document</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
                <div className="flex items-center">Registration Date {renderSortIcon("createdAt")}</div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : !filteredUsers || filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">#{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{formatDate(user.dob)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {user.course}
                    </span>
                  </TableCell>
                  <TableCell>{user.state}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>
                    {user.fileUrl ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleViewDocument(user.fileUrl)}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">No document</span>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber

              if (totalPages <= 5) {
                pageNumber = i + 1
              } else if (currentPage <= 3) {
                pageNumber = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i
              } else {
                pageNumber = currentPage - 2 + i
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink isActive={currentPage === pageNumber} onClick={() => setCurrentPage(pageNumber)}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Document Viewer Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Document Viewer</DialogTitle>
          </DialogHeader>
          <div className="mt-4 h-[60vh] overflow-auto">
            {selectedDocument &&
              (selectedDocument.endsWith(".pdf") ? (
                <iframe src={selectedDocument} className="w-full h-full" title="Document Viewer" />
              ) : (
                <img
                  src={selectedDocument || "/placeholder.svg"}
                  alt="Document"
                  className="max-w-full max-h-full mx-auto"
                />
              ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {viewUser && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p>#{viewUser.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{viewUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{viewUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{viewUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <p>{formatDate(viewUser.dob)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Course</p>
                  <p>{viewUser.course}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">State</p>
                  <p>{viewUser.state}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">City</p>
                  <p>{viewUser.city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                  <p>{formatDate(viewUser.createdAt)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Document</p>
                {viewUser.fileUrl ? (
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleViewDocument(viewUser.fileUrl)}
                  >
                    <FileText className="h-4 w-4" />
                    View Document
                  </Button>
                ) : (
                  <p className="text-muted-foreground">No document uploaded</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
